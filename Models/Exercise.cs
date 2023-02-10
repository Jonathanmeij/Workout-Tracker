namespace Workout_Track_app;

public class Exercise {
    public int Id { get; set; }
    public string Name { get; set; }
    public virtual List<Session> Sessions { get; set; } 
    public virtual Workout Workout { get; set; }
}