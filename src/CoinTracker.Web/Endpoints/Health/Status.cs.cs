using FastEndpoints;

namespace CoinTracker.Web.Endpoints.Health;

public class Status() : EndpointWithoutRequest
{
  public override void Configure()
  {
    Get("/health");
    AllowAnonymous();
  }

  public override Task HandleAsync(CancellationToken cancellationToken)
  {
    var response = new
    {
      Status = "OK",
      Timestamp = DateTime.Now,
      Version = "1.0.0"
    };
    Response = response;
    return Task.CompletedTask;
  }
}
