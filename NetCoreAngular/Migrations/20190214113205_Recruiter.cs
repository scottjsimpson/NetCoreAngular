using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreAngular.Migrations
{
    public partial class Recruiter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RecruiterID",
                table: "Job",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Recruiter",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    Tel = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recruiter", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Job_RecruiterID",
                table: "Job",
                column: "RecruiterID");

            migrationBuilder.AddForeignKey(
                name: "FK_Job_Recruiter_RecruiterID",
                table: "Job",
                column: "RecruiterID",
                principalTable: "Recruiter",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Job_Recruiter_RecruiterID",
                table: "Job");

            migrationBuilder.DropTable(
                name: "Recruiter");

            migrationBuilder.DropIndex(
                name: "IX_Job_RecruiterID",
                table: "Job");

            migrationBuilder.DropColumn(
                name: "RecruiterID",
                table: "Job");
        }
    }
}
