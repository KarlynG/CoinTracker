using Ardalis.GuardClauses;
using Autofac.Core;
using CoinTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CoinTracker.Web.Config;

public static class Sql
{
  public static void AddSqlConnection(this IServiceCollection service, IConfiguration builder)
  {
    string? connectionString = builder.GetConnectionString("DefaultConnection");
    Guard.Against.Null(connectionString);
    service.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));
  }
}
