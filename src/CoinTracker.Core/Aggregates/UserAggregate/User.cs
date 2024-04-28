using Ardalis.GuardClauses;
using Ardalis.SharedKernel;
using CoinTracker.Core.Abstract;
using CoinTracker.Core.Enums;

namespace CoinTracker.Core.Aggregates.UserAggregate;
public class User(string firebaseId, string name) : BaseEntity, IAggregateRoot
{
  public string FirebaseId { get; init; } = Guard.Against.NullOrEmpty(firebaseId, nameof(firebaseId));
  public string Name { get; set; } = Guard.Against.NullOrEmpty(name, nameof(name));
  public string? LastName { get; private set; }
  public ICollection<UserBudget> Budgets { get; set; } = new HashSet<UserBudget>();
  public decimal TotalSpentMonth { get; init; }
  public decimal TotalSpentYear { get; init; }
  public decimal TotalSpentEver { get; init; }
  public void SetLastName(string lastName)
  {
    LastName = lastName;
  }
  public void AddBudget(decimal amount, Currencies currency, string name, decimal? limit, LimitPeriod limitPeriod)
  {
    Budgets.Add(new UserBudget
    {
      FullAmount = amount,
      Currency = currency,
      Name = name,
      Limit = limit ?? amount,
      LimitPeriod = limitPeriod,
    });
  }

  public void UpdateUser(string firstName, string lastName)
  {
    Name = firstName;
    LastName = lastName;
  }

  public void UpdateBudget(UserBudget budget)
  {
    var userBudget = Budgets.FirstOrDefault()!;
    userBudget.FullAmount = budget.FullAmount;
    userBudget.Currency = budget.Currency;
    userBudget.Name = budget.Name;
    userBudget.Limit = budget.Limit;
    userBudget.LimitPeriod = budget.LimitPeriod;
  }

  public void DeleteBudget()
  {
    if(Budgets.Count > 0)
    {
      Budgets.FirstOrDefault()!.Deleted = true;
      Budgets.FirstOrDefault()!.DeletedDate = DateTimeOffset.UtcNow;
    }
  }
}
