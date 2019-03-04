using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreAngular.Migrations
{
    public partial class CompanyImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Company");

            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "Company",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Company_ImageId",
                table: "Company",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Company_FileUpload_ImageId",
                table: "Company",
                column: "ImageId",
                principalTable: "FileUpload",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Company_FileUpload_ImageId",
                table: "Company");

            migrationBuilder.DropIndex(
                name: "IX_Company_ImageId",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Company");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Company",
                nullable: true);
        }
    }
}
