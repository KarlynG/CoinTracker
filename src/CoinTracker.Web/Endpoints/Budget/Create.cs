using Ardalis.Result;
using CoinTracker.UseCases.Budget;
using CoinTracker.UseCases.Budget.Create;
using FastEndpoints;
using MediatR;
using autoMapper = AutoMapper;

namespace CoinTracker.Web.Endpoints.Budget;

public class Create(IMediator mediator, autoMapper.IMapper mapper) : Endpoint<CreateBudgetCommand, BudgetDto>
{
  public override void Configure()
  {
    Post("/Budget");
    Summary(s =>
    {
      s.ExampleRequest = new CreateBudgetCommand
      {
        FirebaseId = "HkPkneMGvbfFwBuLp3e9Q55oeZ73",
        FullAmount = 10000,
        Currency = Core.Enums.Currencies.DOP,
        Name = "Salary expenses",
        Limit = null,
        LimitPeriod = Core.Enums.LimitPeriod.Monthly,
      };
    });
  }

  public override async Task HandleAsync(
    CreateBudgetCommand request,
    CancellationToken cancellationToken)
  {
    try
    {
      var result = await mediator.Send(request, cancellationToken);
      if (result.Status == ResultStatus.NotFound)
      {
        AddError(x => x.FirebaseId, $"No user found with the id: {request.FirebaseId}");
        await SendNotFoundAsync(cancellationToken);
        return;
      }
      if (result.IsSuccess)
      {
        Response = mapper.Map<BudgetDto>(result.Value);
      }
    }
    catch (Exception ex)
    {
      AddError(x => x.FirebaseId, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
