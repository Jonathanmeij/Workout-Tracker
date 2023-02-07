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
    // protected override void OnModelCreating(ModelBuilder modelBuilder) {
    //     base.OnModelCreating(modelBuilder);
    //     modelBuilder.Entity<Workout>().ToTable("Workout");
    //     modelBuilder.Entity<Exercise>().ToTable("Exercise");
    //     modelBuilder.Entity<Session>().ToTable("Session");
    // }
    
}