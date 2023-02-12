namespace Workout_Track_app;

public class Session {
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int Weight { get; set; }
    public int Reps { get; set; }
    public int Sets { get; set; }
    public virtual Exercise Exercise { get; set; } = null!;
}