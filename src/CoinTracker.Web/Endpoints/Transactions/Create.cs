using Ardalis.Result;
using CoinTracker.Core.Aggregates.TransactionAggregate;
using CoinTracker.Core.Enums;
using CoinTracker.Core.Interfaces;
using CoinTracker.UseCases.Transaction;
using CoinTracker.UseCases.Transaction.Create;
using CoinTracker.UseCases.Transaction.Create.Dtos;
using FastEndpoints;
using MediatR;
using autoMapper = AutoMapper;

namespace CoinTracker.Web.Endpoints.Transactions;

public class Create(IMediator mediator, autoMapper.IMapper mapper, IBudgetService budgetService) : Endpoint<CreateTransactionDto, BudgetTransactionDto>
{
  public override void Configure()
  {
    Post("Transaction");
    Summary(s =>
    {
      s.ExampleRequest = new CreateTransactionDto()
      {
        UserId = new Guid("0e0ba3f3-c9c4-4eea-c61d-08dc462b2682"),
        BudgetId = new Guid("c72e59c0-369a-49d6-a415-08dc5ca592ac"),
        Amount = 100,
        Category = ExpenseCategories.Other,
        Description = "Bough some stuff from amazon",
        RecurringTransaction = new RecurringTransactionDto()
        {
          Frequency = RecurrenceFrequency.Daily,
          Interval = 1,
          IsActive = true,
          NextOccurrence = DateTime.Now,
        }
      };
    });
  }
  public override async Task HandleAsync(
    CreateTransactionDto request,
    CancellationToken cancellationToken)
  {
    try
    {
      var budgetIsAssociatedWithUser = await budgetService.CheckIfBudgetIsAssociatedWithUser(request.BudgetId, request.UserId, cancellationToken);
      if(!budgetIsAssociatedWithUser.Value)
      {
        AddError(x => x.UserId, $"The User: {request.UserId} is not associated with the budget: {request.BudgetId}");
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }
      var transaction = mapper.Map<BudgetTransaction>(request);
      transaction.AddDateTime(request.Date ?? DateTimeOffset.Now);
      var command = new CreateTransactionCommand()
      {
        Transaction = transaction,
      };
      var result = await mediator.Send(command, cancellationToken);
      if (result.Status == ResultStatus.NotFound)
      {
        AddError(x => x, $"No Budget found with the id: {request.BudgetId}");
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }
      if (result.IsSuccess)
      {
        Response = mapper.Map<BudgetTransactionDto>(result.Value);
      }
    }
    catch (Exception ex)
    {
      AddError(x => x, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
