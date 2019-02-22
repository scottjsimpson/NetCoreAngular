using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreAngular.Migrations
{
    public partial class JobFieldChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Salary",
                table: "Job",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Salary",
                table: "Job",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
