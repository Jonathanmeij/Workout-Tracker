namespace Workout_Track_app;

public class Session {
    public Session( DateTime date, int weight, int reps, Exercise exercise) {
        Date = date;
        Weight = weight;
        Reps = reps;
        Exercise = exercise;
    }
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int Weight { get; set; }
    public int Reps { get; set; }
    public Exercise Exercise { get; set; }
}