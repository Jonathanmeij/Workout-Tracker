namespace Workout_Track_app;

public class Workout
{
  
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Exercise> Exercises { get; set; }
    public Gebruiker Gebruiker { get; set; }
}