using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace CoinTracker.Web.Config;

public static class JwtBearerAuthConfig
{
  public static IServiceCollection ConfigJwtAuth(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
      opt.Authority = configuration["Jwt:Firebase:ValidIssuer"];
      opt.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = configuration["Jwt:Firebase:ValidIssuer"],
        ValidAudience = configuration["Jwt:Firebase:ValidAudience"]
      };
    });

    return services;
  }
}
