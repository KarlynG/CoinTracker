using System.Configuration;
using Ardalis.GuardClauses;
using CoinTracker.Infrastructure.Config.Hangfire;
using Hangfire;
using Hangfire.PostgreSql;
using Hangfire.SqlServer;
using Microsoft.EntityFrameworkCore;

namespace CoinTracker.Web.Config;

public static class Hangfire
{
  public static void AddHangfireConfig(this IServiceCollection services, IConfiguration configuration)
  {
    string? connectionString = configuration.GetConnectionString("DefaultConnection");
    Guard.Against.Null(connectionString);

    services.AddHangfire(config => config
      .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
      .UseSimpleAssemblyNameTypeSerializer()
      .UseRecommendedSerializerSettings()
      .UsePostgreSqlStorage(c =>
        c.UseNpgsqlConnection(connectionString)));


    services.AddHangfireServer(options =>
    {
      options.WorkerCount = 1;
      options.ServerName = "MyBackgroundJobServer";
    });
  }

  public static void UseHangfireConfig(this IApplicationBuilder app)
  {
    var recurringJobManager = app.ApplicationServices.GetRequiredService<IRecurringJobManager>();
    recurringJobManager.AddOrUpdate<RecurringTransactionJob>("MyJob", job => job.ProcessRecurringTransactions(), Cron.Daily);
  }
}
