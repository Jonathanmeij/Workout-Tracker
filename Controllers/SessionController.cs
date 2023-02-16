using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Workout_Track_app;

[Route("api/[controller]")]
[ApiController]
public class SessionController : ControllerBase {
    private readonly DatabaseContext _context;
    private readonly ILogger<SessionController> _logger;

    public SessionController(DatabaseContext context, ILogger<SessionController> logger) {
        _context = context;
        _logger = logger;
    }

    // [HttpGet]
    // [Authorize]
    // public async Task<ActionResult<IEnumerable<Exercise>>> GetExercises() {
    //     var gebruiker = await _context.Gebruikers.FindAsync(User?.Identity?.Name);

    //     if (gebruiker == null) {
    //         return Unauthorized();
    //     }

    //     var exercises = await _context.Exercises.Where(e => e. == gebruiker.Id).ToListAsync();
    // }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Session>> GetSession(int id) {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized("User not found");
        }

        var gebruiker = _context.Gebruikers.FirstOrDefault(g => g.UserName == username);

        if (gebruiker == null) {
            return Unauthorized("User not found");
        }

        var session = await _context.Sessions.FindAsync(id);

        if (session == null) {
            return NotFound("Session not found");
        }

        if (session.Exercise.Workout.Gebruiker.Id != gebruiker.Id) {
            return Unauthorized("User is not allowed to view this session");
        }

        return session;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Session>> PostSession(SessionDto sessionDto) 
    {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized("User not found");
        }

        var gebruiker = _context.Gebruikers.FirstOrDefault(g => g.UserName == username);

        if (gebruiker == null) {
            return Unauthorized("User not found");
        }

        var exercise = await _context.Exercises
            .Include(e => e.Workout)
            .ThenInclude(w => w.Gebruiker)
            .FirstOrDefaultAsync(e => e.Id == sessionDto.ExerciseId);

        if (exercise == null) {
            return NotFound("Exercise not found");
        }

        if(exercise.Workout.Gebruiker.Id != gebruiker.Id) {
            return Unauthorized("User is not allowed to add a session to this exercise");
        }

        var session = new Session {
            Exercise = exercise,
            Weight = sessionDto.Weight,
            Reps = sessionDto.Reps,
            Sets = sessionDto.Sets,
            Date = DateTime.Now
        };

        _context.Sessions.Add(session);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetSession", new { id = session.Id }, session);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> PutSession(int id, SessionPutDto sessionPutDto)
    {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized("User not found");
        }

        var gebruiker = _context.Gebruikers.FirstOrDefault(g => g.UserName == username);

        if (gebruiker == null) {
            return Unauthorized("User not found");
        }

        var session = await _context.Sessions
            .Include(s => s.Exercise)
            .ThenInclude(e => e.Workout)
            .ThenInclude(w => w.Gebruiker)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (session == null) {
            return NotFound("Session not found");
        }

        if (session.Exercise.Workout.Gebruiker.Id != gebruiker.Id) {
            return Unauthorized("User is not allowed to edit this session");
        }

        session.Weight = sessionPutDto.Weight;
        session.Reps = sessionPutDto.Reps;
        session.Sets = sessionPutDto.Sets;

        _context.Sessions.Update(session);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteSession(int id)
    {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized("User not found");
        }

        var gebruiker = _context.Gebruikers.FirstOrDefault(g => g.UserName == username);

        if (gebruiker == null) {
            return Unauthorized("User not found");
        }

        var session = await _context.Sessions
            .Include(s => s.Exercise)
            .ThenInclude(e => e.Workout)
            .ThenInclude(w => w.Gebruiker)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (session == null) {
            return NotFound("Session not found");
        }

        if (session.Exercise.Workout.Gebruiker.Id != gebruiker.Id) {
            return Unauthorized("User is not allowed to delete this session");
        }

        _context.Sessions.Remove(session);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

public class SessionReturnDto
{
    public int Id { get; set; }
    public int ExerciseId { get; set; }
    public int Weight { get; set; }
    public int Reps { get; set; }
    public int Sets { get; set; }
}

public class SessionDto {
    public int ExerciseId { get; set; }
    public int Weight { get; set; }
    public int Reps { get; set; }
    public int Sets { get; set; }
}

public class SessionPutDto {
    public int Weight { get; set; }
    public int Reps { get; set; }
    public int Sets { get; set; }
}