using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.RecurringTransactions;
using CoinTracker.Core.Aggregates.RecurringTransactions.Specifications;
using CoinTracker.Core.Aggregates.TransactionAggregate;
using CoinTracker.Core.Enums;

namespace CoinTracker.Infrastructure.Config.Hangfire;
public class RecurringTransactionJob(IRepository<BudgetTransaction> transactionRepository, IRepository<RecurringTransaction> recurrentRepository)
{
  public async Task ProcessRecurringTransactions()
  {
    try
    {
      var spec = new GetRecurringTransactions();
      var recurringTransactions = await recurrentRepository.ListAsync(spec);
      if (!recurringTransactions.Any())
        return;

      foreach (var recurringTransaction in recurringTransactions)
      {
        var newTransaction = await transactionRepository.GetByIdAsync(recurringTransaction.BudgetTransactionId);
        newTransaction!.Id = new Guid();
        await transactionRepository.AddAsync(newTransaction!);

        // Update the next occurrence date of the recurring transaction
        recurringTransaction.NextOccurrence = CalculateNextOccurrence(recurringTransaction);
        await recurrentRepository.UpdateAsync(recurringTransaction);
      }
    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  }

  private DateTimeOffset CalculateNextOccurrence(RecurringTransaction recurringTransaction)
  {
    var nextOccurrence = recurringTransaction.NextOccurrence;

    switch (recurringTransaction.Frequency)
    {
      case RecurrenceFrequency.Daily:
        nextOccurrence = nextOccurrence.AddDays(recurringTransaction.Interval);
        break;
      case RecurrenceFrequency.Monthly:
        nextOccurrence = nextOccurrence.AddMonths(recurringTransaction.Interval);
        break;
      case RecurrenceFrequency.Yearly:
        nextOccurrence = nextOccurrence.AddYears(recurringTransaction.Interval);
        break;
    }

    return nextOccurrence;
  }
}
