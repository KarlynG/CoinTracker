using CoinTracker.Core.Abstract;
using CoinTracker.UseCases.Budget;

namespace CoinTracker.Infrastructure.Config.Dtos;
public class BudgetListDto
{
  public BasePaginatedResponse<BudgetDto>? Budgets { get; set; }
}
