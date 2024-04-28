using Ardalis.ListStartupServices;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using CoinTracker.Core;
using CoinTracker.Infrastructure;
using CoinTracker.Web.Config;
using CoinTracker.Web.Config.AuthHandlers;
using FastEndpoints;
using FastEndpoints.Swagger;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Hangfire;
using Microsoft.AspNetCore.Authentication;
using Serilog;

var logger = Log.Logger = new LoggerConfiguration()
  .Enrich.FromLogContext()
  .WriteTo.Console()
  .CreateLogger();

logger.Information("Starting web host");

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());


builder.Host.UseSerilog((_, config) => config.ReadFrom.Configuration(builder.Configuration));

builder.Services.Configure<CookiePolicyOptions>(options =>
{
  options.CheckConsentNeeded = context => true;
  options.MinimumSameSitePolicy = SameSiteMode.None;
});

builder.Services.AddSqlConnection(builder.Configuration);
builder.Services.AddHangfireConfig(builder.Configuration);


builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
{
  containerBuilder.RegisterModule(new DefaultCoreModule());
  containerBuilder.RegisterModule(new AutofacInfrastructureModule(builder.Environment.IsDevelopment()));
});

#region Firebase

FirebaseApp.Create(new AppOptions
{
  Credential = GoogleCredential.FromFile(builder.Configuration.GetValue<string>("FirebaseSdk"))
});

builder.Services.ConfigJwtAuth(builder.Configuration);

#endregion

#region Custom Auth
builder.Services
  .AddAuthorization()
  .AddFastEndpoints();
builder.Services.AddSwagger();
builder.Services.AddAuthentication("FirebaseAuth") // The default authentication scheme
    .AddScheme<AuthenticationSchemeOptions, FirebaseHandler>("FirebaseAuth", null);

builder.Services.AddSingleton(FirebaseAuth.DefaultInstance);
#endregion

#region Cors
builder.Services.AddCors(options =>
{
  options.AddPolicy("MainPolicy",
    builder =>
    {
      builder
          .SetIsOriginAllowed(x => true)
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials();
    });
});
#endregion
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app
  .UseAuthentication()
  .UseAuthorization()
  .UseFastEndpoints(c =>
  {
    c.Endpoints.RoutePrefix = "api";
  });
if (app.Environment.IsDevelopment())
{
  app.UseDeveloperExceptionPage();
  app.UseShowAllServicesMiddleware(); // see https://github.com/ardalis/AspNetCoreStartupServices
  app.UseSwaggerGen(); // FastEndpoints middleware
}
else
{
  app.UseDefaultExceptionHandler(); // from FastEndpoints
  app.UseHsts();
}
var dashboardOptions = new DashboardOptions
{
  Authorization = new[] { new AllowAnonymousAuthorizationFilter() }
};
app.UseHangfireDashboard("/hangfire", dashboardOptions);
app.UseHangfireConfig();
app.UseCors("MainPolicy");
app.MapFallbackToFile("/index.html");
app.UseHttpsRedirection();

app.Run();

