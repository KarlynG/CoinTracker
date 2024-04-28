using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace CoinTracker.Web.Config.AuthHandlers;

public class FirebaseHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
  private readonly FirebaseAuth _firebaseAuth;
  [Obsolete]
  public FirebaseHandler(
      IOptionsMonitor<AuthenticationSchemeOptions> options,
      ILoggerFactory logger,
      UrlEncoder encoder,
      ISystemClock clock,
      FirebaseAuth firebaseAuth) : base(options, logger, encoder, clock)
  {
    _firebaseAuth = firebaseAuth;
  }

  protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
  {
    if (!Request.Headers.TryGetValue("Authorization", out var authHeaderValues))
    {
      return AuthenticateResult.Fail("Authorization header not found");
    }

    var authHeaderValue = AuthenticationHeaderValue.Parse(authHeaderValues);
    if (authHeaderValue.Scheme != "Bearer")
    {
      return AuthenticateResult.Fail("Invalid authorization scheme");
    }
    var jwt = authHeaderValue.Parameter;
    try
    {
      var token = await _firebaseAuth.VerifyIdTokenAsync(jwt);
      if (token != null)
      {
        var claims = token.Claims.Select(c => new Claim(c.Key, c.Value.ToString()));
        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var ticket = new AuthenticationTicket(new ClaimsPrincipal(identity), Scheme.Name);
        return AuthenticateResult.Success(ticket);
      }
      else
      {
        return AuthenticateResult.Fail("Bearer token not found");
      }
    }
    catch
    {
      return AuthenticateResult.Fail("Invalid Firebase ID token");
    }
  }
}
