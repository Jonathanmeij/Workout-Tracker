using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkoutTrackapp.Migrations
{
    /// <inheritdoc />
    public partial class _2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GebruikerId",
                table: "Workouts",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_GebruikerId",
                table: "Workouts",
                column: "GebruikerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_AspNetUsers_GebruikerId",
                table: "Workouts",
                column: "GebruikerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_AspNetUsers_GebruikerId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Workouts_GebruikerId",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "GebruikerId",
                table: "Workouts");
        }
    }
}
