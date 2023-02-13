using Microsoft.AspNetCore.Identity;

namespace Workout_Track_app;

public class Gebruiker : IdentityUser {
    public int WorkoutAmount { get; set; }
    public virtual List<Workout> Workouts { get; set; } = new();
    public virtual RefreshToken RefreshToken { get; set; } = null!;
}