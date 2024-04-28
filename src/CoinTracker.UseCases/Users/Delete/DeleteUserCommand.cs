using Ardalis.Result;
using Ardalis.SharedKernel;

namespace CoinTracker.UseCases.Users.Delete;
public record DeleteUserCommand(string FirebaseId) : ICommand<Result>;
