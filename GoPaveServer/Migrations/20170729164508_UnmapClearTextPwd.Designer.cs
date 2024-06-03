using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using GoPaveServer.Data;

namespace GoPaveServer.Migrations
{
    [DbContext(typeof(UserContext))]
    [Migration("20170729164508_UnmapClearTextPwd")]
    partial class UnmapClearTextPwd
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GoPaveServer.Models.User", b =>
                {
                    b.Property<int?>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("UserName");

                    b.HasKey("ID");

                    b.ToTable("GoPaveUsers");
                });
        }
    }
}
