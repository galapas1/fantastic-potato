using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GoPaveServer.Migrations.Project
{
    public partial class RenameOwnerAgency : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OwnerAgency",
                table: "Projects",
                newName: "OwnersAgency");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OwnersAgency",
                table: "Projects",
                newName: "OwnerAgency");
        }
    }
}
