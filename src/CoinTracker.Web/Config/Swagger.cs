using FastEndpoints.Swagger;

namespace CoinTracker.Web.Config;

public static class Swagger
{
  public static void AddSwagger(this IServiceCollection service)
  {
    service.SwaggerDocument(o =>
    {
      o.ShortSchemaNames = true;
    });
  }
}
