using Ardalis.Result;
using CoinTracker.Core.Interfaces;
using FirebaseAdmin.Auth;

namespace CoinTracker.Infrastructure.Config.Firebase;
public class FirebaseAuthService : IFirebaseAuthService
{
  public async Task<Result<UserRecord>> AddUser(string firstName, string lastName, string email = "", string password = "", string phoneNumber = "")
  {
    // Create a new user with the specified email and password
    var args = new UserRecordArgs()
    {
      DisplayName = $"{firstName} {lastName}",
      Email = email,
      Password = password,
      PhoneNumber = phoneNumber,
    };

    try
    {
      var userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(args);
      return new Result<UserRecord>(userRecord);
    }
    catch (Exception e)
    {
      var errors = new List<ValidationError>
      {
        new ValidationError()
        {
          Identifier = nameof(e),
          ErrorMessage = $"Firebase Error: {e.Message}"
        }
      };
      return Result<UserRecord>.Invalid(errors);
    }
  }
  public async Task<Result> DeleteUser(string uid, CancellationToken? cancellationToken)
  {
    try
    {
      if(cancellationToken.HasValue)
        await FirebaseAuth.DefaultInstance.DeleteUserAsync(uid, cancellationToken.Value);
      else
        await FirebaseAuth.DefaultInstance.DeleteUserAsync(uid);
      return Result.Success();
    }
    catch (AggregateException e)
    {
      var errors = new List<ValidationError>
      {
        new ValidationError()
        {
          Identifier = nameof(e),
          ErrorMessage = $"Error deleting user. Uid: {uid}. Error: {e}"
        }
      };
      return Result.Invalid(errors);
    }
  }

  public async Task<Result<UserRecord>> GetUser(string firebaseId)
  {
    try
    {
      var pagedEnumerable = await FirebaseAuth.DefaultInstance.GetUserAsync(firebaseId);
      return Result<UserRecord>.Success(pagedEnumerable);
    }
    catch (FirebaseAuthException e)
    {
      var errors = new List<ValidationError>
      {
        new ValidationError()
        {
          Identifier = nameof(e),
          ErrorMessage = $"Error getting the user. Error: {e}"
        }
      };
      return Result<UserRecord>.Invalid(errors);
    }
  }

  public async Task<Result<List<ExportedUserRecord>>> GetAllUsers()
  {
    try
    {
      var pagedEnumerable = FirebaseAuth.DefaultInstance.ListUsersAsync(null);
      var responses = pagedEnumerable.AsRawResponses().GetAsyncEnumerator();
      List<ExportedUserRecord> users = new();
      while (await responses.MoveNextAsync())
      {
        var response = responses.Current;
        foreach (var user in response.Users)
        {
          users.Add(user);
        }
      }
      return Result<List<ExportedUserRecord>>.Success(users);
    }
    catch (AggregateException e)
    {
      var errors = new List<ValidationError>
      {
        new ValidationError()
        {
          Identifier = nameof(e),
          ErrorMessage = $"Error getting all users. Error: {e}"
        }
      };
      return Result<List<ExportedUserRecord>>.Invalid(errors);
    }
  }

  public async Task<Result<UserRecord>> UpdateUser(string idToken, string uid, string email = "", string password = "")
  {
    try
    {
      // Verify ID token
      FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);

      if (decodedToken.Uid == uid)
      {
        UserRecordArgs args = new UserRecordArgs() { Uid = uid };
        if (string.IsNullOrEmpty(email))
          args.Email = email;

        if (string.IsNullOrEmpty(password))
          args.Password = password;

        UserRecord updatedUser = await FirebaseAuth.DefaultInstance.UpdateUserAsync(args);
        return Result<UserRecord>.Success(updatedUser);
      }
      else
      {
        throw new Exception();
      }
    }
    catch (FirebaseAuthException)
    {
      throw new Exception();
    }
  }
}
