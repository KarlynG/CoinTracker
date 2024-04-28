namespace CoinTracker.Core.Abstract;
public class BasePaginatedResponse<TEntity>
{
  public BasePaginatedResponse(int? page, int? pageSize, IEnumerable<TEntity> entity, int totalRecords)
  {
    PageNumber = page;
    PageSize = pageSize;
    TotalRecords = totalRecords;
    TotalPages = (PageSize == null | PageSize == 0) ? 0 : (int)Math.Ceiling(TotalRecords / (double)PageSize!);
    Items = entity;
  }
  public BasePaginatedResponse() { }
  public int? PageNumber { get; set; }
  public int? PageSize { get; set; }
  public int TotalRecords { get; set; }
  public int? TotalPages { get; set; }
  public IEnumerable<TEntity> Items { get; set; }
}
