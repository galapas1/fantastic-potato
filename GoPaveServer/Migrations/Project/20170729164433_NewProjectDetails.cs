using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GoPaveServer.Migrations.Project
{
    public partial class NewProjectDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "Projects",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Designer",
                table: "Projects",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Route",
                table: "Projects",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "Projects",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Designer",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Route",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "Projects");
        }
    }
}
