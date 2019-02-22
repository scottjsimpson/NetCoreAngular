using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreAngular.Migrations
{
    public partial class RecruiterOptional : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Job_Recruiter_RecruiterId",
                table: "Job");

            migrationBuilder.AlterColumn<int>(
                name: "RecruiterId",
                table: "Job",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Job_Recruiter_RecruiterId",
                table: "Job",
                column: "RecruiterId",
                principalTable: "Recruiter",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Job_Recruiter_RecruiterId",
                table: "Job");

            migrationBuilder.AlterColumn<int>(
                name: "RecruiterId",
                table: "Job",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Job_Recruiter_RecruiterId",
                table: "Job",
                column: "RecruiterId",
                principalTable: "Recruiter",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
