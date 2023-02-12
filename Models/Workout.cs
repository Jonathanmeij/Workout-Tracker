namespace Workout_Track_app;

public class Workout
{
  
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public virtual List<Exercise> Exercises { get; set; } = new();
    public Gebruiker Gebruiker { get; set; } = null!;
}