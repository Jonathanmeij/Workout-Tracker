namespace Workout_Track_app;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class DatabaseContext : IdentityDbContext<Gebruiker> {
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) 
    {
    }
    public DbSet<Workout> Workouts { get; set; }
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Gebruiker> Gebruikers { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Workout>().HasMany(w => w.Exercises).WithOne(e => e.Workout);
        modelBuilder.Entity<Workout>().HasOne(w => w.Gebruiker).WithMany(g => g.Workouts);
        modelBuilder.Entity<Exercise>().HasMany(e => e.Sessions).WithOne(s => s.Exercise);
        //Refresh token primary key with gebruikerId
        modelBuilder.Entity<RefreshToken>().HasKey(rt => rt.GebruikerId);
        modelBuilder.Entity<Gebruiker>().HasOne(g => g.RefreshToken).WithOne(rt => rt.Gebruiker);
        base.OnModelCreating(modelBuilder);
    }
}