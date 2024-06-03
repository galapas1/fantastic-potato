using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GoPaveServer.Migrations.IntermodalVehicle
{
    public partial class IntermodalVehicles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IntermodalVehicles",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CanEdit = table.Column<bool>(nullable: false),
                    ContactArea = table.Column<double>(nullable: false),
                    ContactPressure = table.Column<double>(nullable: false),
                    GearConfiguration = table.Column<int>(nullable: false),
                    GrossWeight = table.Column<double>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    NumberOfWheels = table.Column<int>(nullable: false),
                    UserID = table.Column<int>(nullable: false),
                    XAxleCoords = table.Column<string>(nullable: true),
                    YAxleCoords = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntermodalVehicles", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IntermodalVehicles");
        }
    }
}
