using Hangfire.Dashboard;

namespace CoinTracker.Web.Config;

public class AllowAnonymousAuthorizationFilter : IDashboardAuthorizationFilter
{
  public bool Authorize(DashboardContext context)
  {
    // Allow anonymous access to the Hangfire dashboard
    return true;
  }
}
