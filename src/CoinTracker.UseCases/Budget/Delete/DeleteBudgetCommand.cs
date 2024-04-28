using Ardalis.Result;
using Ardalis.SharedKernel;

namespace CoinTracker.UseCases.Budget.Delete;
public record DeleteBudgetCommand(Guid BudgetId, Guid UserId) : ICommand<Result>;
