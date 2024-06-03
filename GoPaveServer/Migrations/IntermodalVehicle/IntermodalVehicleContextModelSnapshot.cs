﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using GoPaveServer.Data;
using GoPaveServer.Models;

namespace GoPaveServer.Migrations.IntermodalVehicle
{
    [DbContext(typeof(IntermodalVehicleContext))]
    partial class IntermodalVehicleContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GoPaveServer.Models.IntermodalVehicle", b =>
                {
                    b.Property<int?>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("CanEdit");

                    b.Property<double>("ContactArea");

                    b.Property<double>("ContactPressure");

                    b.Property<int>("GearConfiguration");

                    b.Property<double>("GrossWeight");

                    b.Property<string>("Name");

                    b.Property<int>("NumberOfWheels");

                    b.Property<string>("UnitType");

                    b.Property<int>("UserID");

                    b.Property<string>("XAxleCoords");

                    b.Property<string>("YAxleCoords");

                    b.HasKey("ID");

                    b.ToTable("IntermodalVehicles");
                });
        }
    }
}
