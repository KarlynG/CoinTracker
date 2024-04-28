using Ardalis.Result;
using FirebaseAdmin.Auth;

namespace CoinTracker.Core.Interfaces;
public interface IFirebaseAuthService
{
  Task<Result<UserRecord>> AddUser(string firstName, string lastName, string email = "", string password = "", string phoneNumber = "");
  Task<Result<UserRecord>> UpdateUser(string idToken, string uid, string email = "", string password = "");
  Task<Result> DeleteUser(string uid, CancellationToken? cancellationToken);
  Task<Result<UserRecord>> GetUser(string firebaseId);
  Task<Result<List<ExportedUserRecord>>> GetAllUsers();
}
