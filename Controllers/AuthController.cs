using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;


namespace Workout_Track_app;

public class GebruikerRegistreer
{
    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; init; }
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; init; }
}

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<Gebruiker> _userManager;
    private readonly SignInManager<Gebruiker> _signInManager;
    // private readonly IEmailSender _emailSender;
    private readonly ILogger _logger;
    private readonly DatabaseContext _context;
    private readonly IConfiguration configuration;

    public AuthController(UserManager<Gebruiker> userManager, SignInManager<Gebruiker> signInManager, ILogger<AuthController> logger, DatabaseContext context, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        // _emailSender = emailSender;
        _logger = logger;
        _context = context;
        this.configuration = configuration;
    }


    [HttpPost]
    [Route("register")]
    public async Task<ActionResult<Gebruiker>> Registreer([FromBody] GebruikerRegistreer gebruikerRegistreer)
    {
        //check if email domain is in Services/emailDenyList.txt
        // var emailDenyList = System.IO.File.ReadAllLines("Services/emailDenyList.txt");
        // string gebruikerDomain = gebruikerRegistreer.Email.Split('@')[1];
        // if (emailDenyList.Contains(gebruikerDomain))
        // {
        //     return BadRequest("Email domain is not allowed");
        // }

        var gebruiker = new Gebruiker
        {
            UserName = gebruikerRegistreer.Email,
            Email = gebruikerRegistreer.Email,
            // Voornaam = gebruikerRegistreer.Voornaam,
            // Achternaam = gebruikerRegistreer.Achternaam,
        };
        var resultaat = await _userManager.CreateAsync(gebruiker, gebruikerRegistreer.Password);

        if (resultaat.Succeeded)
        {
            await _userManager.AddToRoleAsync(gebruiker, "Gebruiker");
            // await sendConfirmationEmail(gebruiker);

            return StatusCode(201);
        }

        return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] GebruikerLogin gebruikerLogin)
    {
        var _user = await _userManager.FindByEmailAsync(gebruikerLogin.Email);
        if (_user != null)
            if (await _userManager.CheckPasswordAsync(_user, gebruikerLogin.Password))
            {
                string JWTsecret = configuration.GetValue<string>("JWTSecret");
                var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTsecret));

                var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, _user.UserName) };
                var roles = await _userManager.GetRolesAsync(_user);
                foreach (var role in roles)
                    claims.Add(new Claim(ClaimTypes.Role, role));
                var tokenOptions = new JwtSecurityToken
                (
                    issuer: "https://localhost:7047",
                    audience: "https://localhost:7047",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signingCredentials
                );
                var accesToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                // return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });

                var refreshToken = Guid.NewGuid().ToString();
                var refreshTokenExpiryTime = DateTime.Now.AddMonths(2);
                var refreshTokenModel = new RefreshToken
                {
                    Token = refreshToken,
                    ExpirationDate = refreshTokenExpiryTime,
                    Gebruiker = _user,
                    GebruikerId = _user.Id
                };

                // encrypt refresh token
                var refreshTokenOptions = new JwtSecurityToken
                (
                    issuer: "https://localhost:7047",
                    audience: "https://localhost:7047",
                    claims: new List<Claim> { new Claim(ClaimTypes.Name, refreshTokenModel.Token) },
                    expires: refreshTokenModel.ExpirationDate,
                    signingCredentials: signingCredentials
                );

                // hash refresh token and save to db
                var TokenUnHashed = new JwtSecurityTokenHandler().WriteToken(refreshTokenOptions);

                var Salt = Hashing.GenerateSalt();
                byte[] refreshTokenHash = Hashing.Hash(TokenUnHashed, Salt);
                refreshTokenModel.Token = Convert.ToBase64String(refreshTokenHash);
                refreshTokenModel.Salt = Salt;

                _context.RefreshTokens.RemoveRange(_context.RefreshTokens.Where(x => x.GebruikerId == _user.Id));
                _context.RefreshTokens.Add(refreshTokenModel);
                _context.SaveChanges();

                var refreshTokenMinutes = Convert.ToInt32(refreshTokenExpiryTime.Subtract(DateTime.Now).TotalMinutes);
                var accesTokenMinutes = 60;

                _logger.LogInformation("refresh token: " + TokenUnHashed);
                
                return Ok(new {
                    Token = accesToken,
                    tokenExpiryIn = accesTokenMinutes,
                    RefreshToken = TokenUnHashed,
                    refreshTokenExpiryIn = refreshTokenMinutes
                });
            }

        return Unauthorized();
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest refreshTokenRequest)
    {
        //get name from jwt token
        string? nameClaim = null;
        try {
            var jwtToken = new JwtSecurityToken(refreshTokenRequest.Token);
            nameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;

        } catch (Exception e) {
            return Unauthorized("Token not valid");
        }

        if (nameClaim == null) {
            return Unauthorized("Name claim not found");
        }

        var _user = await _userManager.FindByNameAsync(nameClaim);

        if (_user != null)
        {
            var refreshToken = _context.RefreshTokens.FirstOrDefault(x => x.GebruikerId == _user.Id);


            if (refreshToken == null) {
                return Unauthorized("Refresh token not found");
            }
            
            var IsCorrectRefreshToken = Hashing.VerifyHash(refreshTokenRequest.RefreshToken,  refreshToken.Token, refreshToken.Salt, _logger);

            if (!IsCorrectRefreshToken) {
                return Unauthorized("Refresh token not correct");
            }
        
            var JWTSecret = configuration.GetValue<string>("JWTSecret");
            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTSecret));

            var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, _user.UserName) };
            var roles = await _userManager.GetRolesAsync(_user);
            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));
            var tokenOptions = new JwtSecurityToken
            (
                issuer: "https://localhost:7047",
                audience: "https://localhost:7047",
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signingCredentials
            );
            var accesToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            _logger.LogInformation("Refreshed acces token for user: " + _user.UserName);

            return Ok(new {
                Token = accesToken,
            });
            
        }

        return Unauthorized("User not found");
    }


    [HttpPost("RemoveAllRefreshTokens")]
    [Authorize(Roles = "Admin")]
    public IActionResult RemoveAllRefreshTokens()
    {
        _context.RefreshTokens.RemoveRange(_context.RefreshTokens);
        _context.SaveChanges();

        return Ok();
    }
}

public class GebruikerLogin
{
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; init; }

    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; init; }
}

public class RefreshTokenRequest
{
    [Required(ErrorMessage = "RefreshToken is required")]
    public string RefreshToken { get; init; } = null!;
    [Required(ErrorMessage = "Token is required")]
    public string Token { get; init; } = null!;
}

