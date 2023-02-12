namespace Workout_Track_app;

public class Exercise {
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public virtual List<Session> Sessions { get; set; } = new();
    public virtual Workout Workout { get; set; } = null!;
}