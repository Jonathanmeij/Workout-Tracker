namespace Workout_Track_app;

public class Exercise {
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Session> Sessions { get; set; } 
    public Workout Workout { get; set; }
}