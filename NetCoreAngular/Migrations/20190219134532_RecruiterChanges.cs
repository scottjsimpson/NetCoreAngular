using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreAngular.Migrations
{
    public partial class RecruiterChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Job_Recruiter_RecruiterID",
                table: "Job");

            migrationBuilder.RenameColumn(
                name: "RecruiterID",
                table: "Job",
                newName: "RecruiterId");

            migrationBuilder.RenameIndex(
                name: "IX_Job_RecruiterID",
                table: "Job",
                newName: "IX_Job_RecruiterId");

            migrationBuilder.AlterColumn<string>(
                name: "Tel",
                table: "Recruiter",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Recruiter",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Recruiter",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Recruiter",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Recruiter",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Recruiter",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Job_Recruiter_RecruiterId",
                table: "Job",
                column: "RecruiterId",
                principalTable: "Recruiter",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Job_Recruiter_RecruiterId",
                table: "Job");

            migrationBuilder.RenameColumn(
                name: "RecruiterId",
                table: "Job",
                newName: "RecruiterID");

            migrationBuilder.RenameIndex(
                name: "IX_Job_RecruiterId",
                table: "Job",
                newName: "IX_Job_RecruiterID");

            migrationBuilder.AlterColumn<int>(
                name: "Tel",
                table: "Recruiter",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Recruiter",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Recruiter",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Recruiter",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Recruiter",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Recruiter",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_Job_Recruiter_RecruiterID",
                table: "Job",
                column: "RecruiterID",
                principalTable: "Recruiter",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
