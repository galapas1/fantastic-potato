using GoPaveServer.Data;
using GoPaveServer.Interfaces;
using GoPaveServer.Models;
using GoPaveServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Linq;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Http;
using Serilog;

namespace GoPaveServer
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            Log.Logger = new LoggerConfiguration()
                        .MinimumLevel.Debug()
                        .Enrich.FromLogContext()
                        .CreateLogger();

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
            }

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<UserContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")
            ));
            services.AddDbContext<FolderContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")
            ));
            services.AddDbContext<ProjectContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")
            ));
            services.AddDbContext<IntermodalVehicleContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")
            ));
            services.AddDbContext<AuditEntryContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")
            ));

            services.AddCors( o =>
            {
                o.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin  ()
                                      .AllowAnyMethod  ()
                                      .AllowAnyHeader  ()
                                      .AllowCredentials()
                    );
            });

            services.AddMvc       ();

            services.AddScoped   <ISecureTokenService,   SecureTokenService          >();
            services.AddScoped   <IAuthorizationHandler, AuthorizationTokenService   >();
            services.AddScoped   <IAuthorizationHandler, IdentificationTokenService  >();
            services.AddScoped   <AuditFilter                                        >();
            services.AddScoped   <IHttpContextAccessor,  Services.HttpContextAccessor>();
            services.AddTransient<IEmailSender,          MessageService              >();
            services.AddTransient<ISmsSender,            MessageService              >();
            services.AddTransient<ICalculators,          CalculatorService           >();
            services.AddTransient<IHtmlToPdfService,     HtmlToPdfService            >();

            services.Configure<MessageServiceConfiguration>(Configuration.GetSection("Server:SMTPConfig"));
            services.Configure<SecurityOptions>(Configuration.GetSection("Server:SecurityOptions")).Last();

            // use of static API key to ensure request is from GoPaveWeb
            string apiSecretKey = Configuration.GetValue(typeof(string), "Server:SecurityOptions:ApiSecretKey").ToString();
            if (!string.IsNullOrEmpty(apiSecretKey))
            {
                services.AddAuthorization(options =>
                {
                    options.AddPolicy("ApiSecretKeyRequired",
                        policy =>
                        {
                            policy.Requirements.Add(new ApiKeyRequirement());
                        }
                    );
                });
            }

            // use of per user issued JWT for auth
            bool useJwtTokenAuth = (bool)Configuration.GetValue(typeof(bool), "Server:SecurityOptions:UseJwtTokenAuth");
            if (useJwtTokenAuth)
            {
                services.AddAuthorization(options =>
                {
                    options.AddPolicy("IdentityFromJwtToken",
                        policy =>
                        {
                            policy.Requirements.Add(new IdentificationTokenRequirement());
                        }
                    );
                    options.AddPolicy("ValidateJwtToken",
                        policy =>
                        {
                            policy.Requirements.Add(new AuthorizationTokenRequirement());
                        }
                    );
                });
            }

            services.AddSwaggerGen( o => {
                o.SwaggerDoc("v1",
                             new  Swashbuckle.AspNetCore.Swagger.Info {
                    Version        = "v1",
                    Title          = "GoPave ReSTful APIs",
                    Description    = "GoPaveServer REST API Endpoint Details",
                    Contact        = new  Swashbuckle.AspNetCore.Swagger.Contact {
                        Name  = "@johnbrown",
                        Url   = "surgeforward.com",
                        Email = "johnbrown@surgeforward.com"
                    },
                    TermsOfService = ""
                });
                o.DescribeAllEnumsAsStrings();
                o.OperationFilter<ProducerOperationsFilter>();

                var schema = new ApiKeyScheme
                {
                    Type = "apiKey",
                    Description = "JWT token based authorization"
                };
                schema.Extensions.Add("in", "header");
                schema.Extensions.Add("name", "Authorization");
                o.AddSecurityDefinition("api_key", schema);
                o.DocumentFilter<SwaggerAuthorizationFilter>();
            });
        }

        public void Configure(IApplicationBuilder                   app,
                              IHostingEnvironment                   env,
                              ILoggerFactory                        loggerFactory,
                              IOptions<MessageServiceConfiguration> messageConfig)
        {
            var log = Configuration.GetSection("Logging");
            loggerFactory.AddConsole(log)
                         .AddDebug()
                         .AddSerilog()
                         .AddFile("gopave-{Date}.txt");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage     ();
            }

            using(var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetService<UserContext>             ().Database.Migrate();
                serviceScope.ServiceProvider.GetService<FolderContext>           ().Database.Migrate();
                serviceScope.ServiceProvider.GetService<ProjectContext>          ().Database.Migrate();
                serviceScope.ServiceProvider.GetService<IntermodalVehicleContext>().Database.Migrate();
                serviceScope.ServiceProvider.GetService<AuditEntryContext>       ().Database.Migrate();

                serviceScope.ServiceProvider.GetService<UserContext             >().Initialize();
                serviceScope.ServiceProvider.GetService<FolderContext           >().Initialize();
                serviceScope.ServiceProvider.GetService<ProjectContext          >().Initialize();
                serviceScope.ServiceProvider.GetService<IntermodalVehicleContext>().Initialize();
            }

            app.UseCors("CorsPolicy");

            //app.UseMiddleware(typeof(ErrorHandlingMiddleware));
            app.UseMiddleware<ProcessingTime>();

            app.UseSwagger  ();
            app.UseSwaggerUI (c =>
            {
                c.RoutePrefix = "api/docs";
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "GoPave v1 APIs");
            });
            app.UseMvc      ();
        }
    }
}
