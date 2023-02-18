using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Workout_Track_app;

[Route("api/[controller]")]
[ApiController]
public class ExerciseController : ControllerBase {
    private readonly DatabaseContext _context;

    public ExerciseController(DatabaseContext context) {
        _context = context;
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
    public async Task<ActionResult<Exercise>> GetExercise(int id) {
        var gebruiker = await _context.Gebruikers.FindAsync(User?.Identity?.Name);

        if (gebruiker == null) {
            return Unauthorized();
        }

        var exercise = await _context.Exercises.FindAsync(id);

        if (exercise == null) {
            return NotFound();
        }

        if (exercise.Workout.Gebruiker.Id != gebruiker.Id) {
            return Unauthorized();
        }

        return exercise;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Exercise>> PostExercise(ExerciseDto exerciseDto) {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized();
        }

        var gebruiker = _context.Gebruikers.FirstOrDefault(g => g.UserName == username);

        if (gebruiker == null) {
            return Unauthorized("User not found");
        }

        var workout = await _context.Workouts.Where(w => w.Id == exerciseDto.WorkoutId).FirstOrDefaultAsync();

        if (workout == null) {
            return NotFound("Workout not found");
        }

        if (exerciseDto.Name.Length > 50) {
            return BadRequest("Name is too long");
        }

        if (workout.Gebruiker.Id != gebruiker.Id) {
            return Unauthorized("User is not allowed to add exercises to this workout");
        }

        var exercise = new Exercise {
            Name = exerciseDto.Name,
            Workout = workout
        };

        _context.Exercises.Add(exercise);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetExercise", new { id = exercise.Id }, exercise);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> PutExercise(int id, ExercisePutDto exercisePutDto) {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized();
        }

        var gebruiker = _context.Gebruikers.FirstOrDefault(g => g.UserName == username);

        if (gebruiker == null) {
            return Unauthorized("User not found");
        }

        var exercise = await _context.Exercises.Where(e => e.Id == id)
        .Include(e => e.Workout)
        .ThenInclude(w => w.Gebruiker)
        .FirstOrDefaultAsync();

        if (exercise == null) {
            return NotFound("Exercise not found");
        }

        if (exercisePutDto.Name.Length > 50) {
            return BadRequest("Name is too long");
        }

        if (exercise.Workout.Gebruiker.Id != gebruiker.Id) {
            return Unauthorized("User is not allowed to edit exercises from this workout");
        }

        exercise.Name = exercisePutDto.Name;

        _context.Entry(exercise).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteExercise(int id) {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized();
        }

        var gebruiker = _context.Gebruikers.FirstOrDefault(g => g.UserName == username);

        if (gebruiker == null) {
            return Unauthorized("User not found");
        }

        var exercise = _context.Exercises.Where(e => e.Id == id).Include(e => e.Workout).ThenInclude(w => w.Gebruiker).FirstOrDefault();

        if (exercise == null) {
            return NotFound("Exercise not found");
        }

        if (exercise.Workout.Gebruiker.Id != gebruiker.Id) {
            return Unauthorized("User is not allowed to delete exercises from this workout");
        }

        _context.Exercises.Remove(exercise);
        _context.SaveChanges();

        return Ok();
    }
}

public class ExerciseDto {
    public string Name { get; set; } = null!;
    public int WorkoutId { get; set; }
}

public class ExercisePutDto {
    public string Name { get; set; } = null!;
}