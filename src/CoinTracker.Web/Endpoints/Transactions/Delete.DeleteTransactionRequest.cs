namespace CoinTracker.Web.Endpoints.Transactions;

public class DeleteTransactionRequest
{
  public const string Route = "Transaction/{TransactionId:guid}";
  public static string BuildRoute(Guid budgetId)
  {
    _ = Route.Replace("{TransactionId:guid}", budgetId.ToString());
    return Route;
  }
  public Guid TransactionId { get; set; }
}
