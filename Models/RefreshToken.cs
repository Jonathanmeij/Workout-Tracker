namespace Workout_Track_app;

public class RefreshToken {
    public string Token { get; set; } = null!;
    public DateTime ExpirationDate { get; set; }
    public Gebruiker Gebruiker { get; set; } = null!;
    public string GebruikerId { get; set; } = null!;
}