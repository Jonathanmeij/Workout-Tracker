using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Workout_Track_app;

[Route("api/[controller]")]
public class WorkoutController : ControllerBase {
    private readonly DatabaseContext _context;

    public WorkoutController(DatabaseContext context) {
        _context = context;
    }

    [Authorize]
    [HttpGet]
    public IActionResult GetWorkouts() {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized();
        }

        // fetch workouts with exercises and sessions
        var workouts = _context.Workouts
            .Where(w => w.Gebruiker.UserName == username)
            .Include(w => w.Exercises)
                .ThenInclude(e => e.Sessions)
            .ToList();
        return Ok(workouts);
    }

    [Authorize]
    [HttpPost]
    public IActionResult Post([FromBody] WorkoutDto workoutDto) {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized();
        }

        var gebruiker = _context.Gebruikers.FirstOrDefault(g => g.UserName == username);

        if (gebruiker == null) {
            return Unauthorized();
        }

        if (workoutDto.Name.Length > 50) {
            return BadRequest("Name is too long");
        }

        Workout workout = new Workout {
            Name = workoutDto.Name,
            Gebruiker = gebruiker,
        };

        _context.Workouts.Add(workout);
        _context.SaveChanges();


        return Ok(new WorkoutReturnDto {
            Id = workout.Id,
            Name = workout.Name,
            Exercises = workout.Exercises,
        });
    }

    [Authorize]
    [HttpDelete("{id}")]
    public IActionResult Delete(int id) {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized();
        }

        var gebruiker = _context.Gebruikers.FirstOrDefault(g => g.UserName == username);

        if (gebruiker == null) {
            return Unauthorized();
        }

        var workout = _context.Workouts.FirstOrDefault(w => w.Id == id);

        if (workout == null) {
            return NotFound();
        }

        if (workout.Gebruiker != gebruiker) {
            return Unauthorized();
        }

        _context.Workouts.Remove(workout);
        _context.SaveChanges();
        return Ok();
    }

    [Authorize]
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] WorkoutDto workoutDto) {
        var username = User?.Identity?.Name;

        if (username == null) {
            return Unauthorized();
        }

        var gebruiker = _context.Gebruikers.FirstOrDefault(g => g.UserName == username);

        if (gebruiker == null) {
            return Unauthorized();
        }

        var workout = _context.Workouts.FirstOrDefault(w => w.Id == id);

        if (workout == null) {
            return NotFound();
        }

        if (workout.Gebruiker != gebruiker) {
            return Unauthorized();
        }

        workout.Name = workoutDto.Name;
        _context.SaveChanges();

        return Ok(new WorkoutReturnDto {
            Id = workout.Id,
            Name = workout.Name,
            Exercises = workout.Exercises,
        });
    }
        
}

public class WorkoutDto {
    public string Name { get; set; } = null!;
}

public class WorkoutReturnDto {
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public List<Exercise> Exercises { get; set; } = null!;
}

