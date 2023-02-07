namespace Workout_Track_app;

public class Exercise {
    public Exercise(string name, List<Session> sessions, Workout workout) {
        Name = name;
        Sessions = sessions;
        Workout = workout;
    }
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Session> Sessions { get; set; } 
    public Workout Workout { get; set; }
}