using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Workout_Track_app;

[ApiController]
[Route("api/[controller]")]
public class AccountController: ControllerBase 
{
    private readonly UserManager<Gebruiker> _userManager;
    private readonly SignInManager<Gebruiker> _signInManager;
    private readonly ILogger _logger;
    private readonly DatabaseContext _context;

    public AccountController(UserManager<Gebruiker> userManager, SignInManager<Gebruiker> signInManager, ILogger<AccountController> logger, DatabaseContext context)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _logger = logger;
        _context = context;
    }

    [HttpDelete]
    [Route("delete/{id}")]
    [Authorize (Roles = "Administrator")]
    public async Task<ActionResult> Delete(string id)
    {
        var gebruiker = await _userManager.FindByIdAsync(id);
        if (gebruiker == null)
        {
            return NotFound();
        }
        var result = await _userManager.DeleteAsync(gebruiker);
        if (result.Succeeded)
        {
            return Ok();
        }
        return BadRequest();
    }
    
}