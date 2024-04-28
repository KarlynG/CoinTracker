using Ardalis.SharedKernel;

namespace CoinTracker.Core.Abstract;

public abstract class BaseEntity
{
  public Guid Id { get; set; }
  public bool Deleted { get; set; }
  public DateTimeOffset? DeletedDate { get; set; }
  public DateTimeOffset CreatedDate { get; set; }
  public DateTimeOffset? UpdatedDate { get; set; }
  public string? CreatedBy { get; set; }
  public string? DeletedBy { get; set; }
  public string? UpdatedBy { get; set; }
}
