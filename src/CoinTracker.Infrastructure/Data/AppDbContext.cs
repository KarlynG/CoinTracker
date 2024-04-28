using System.Reflection;
using CoinTracker.Core.Abstract;
using CoinTracker.Core.Aggregates.RecurringTransactions;
using CoinTracker.Core.Aggregates.TransactionAggregate;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;

namespace CoinTracker.Infrastructure.Data;
public class AppDbContext : DbContext
{

  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
  {
  }

  public DbSet<User> Users => Set<User>();
  public DbSet<UserBudget> Budgets => Set<UserBudget>();
  public DbSet<BudgetTransaction> Transactions => Set<BudgetTransaction>();
  public DbSet<RecurringTransaction> RecurrentTransactions => Set<RecurringTransaction>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
    foreach (var type in modelBuilder.Model.GetEntityTypes())
    {
      if (typeof(BaseEntity).IsAssignableFrom(type.ClrType))
        modelBuilder.SetSoftDeleteFilter(type.ClrType);
    }
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }

  private void SetAuditEntities()
  {
    foreach (var entry in ChangeTracker.Entries<BaseEntity>())
    {
      switch (entry.State)
      {
        case EntityState.Added:

          entry.Entity.Deleted = false;
          entry.Entity.CreatedDate = DateTimeOffset.UtcNow;
          break;

        case EntityState.Modified:
          entry.Property(x => x.CreatedDate).IsModified = false;
          entry.Property(x => x.CreatedBy).IsModified = false;
          entry.Entity.UpdatedDate = DateTimeOffset.UtcNow;
          break;

        case EntityState.Deleted:
          entry.Property(x => x.CreatedDate).IsModified = false;
          entry.Property(x => x.CreatedBy).IsModified = false;
          entry.State = EntityState.Modified;
          entry.Entity.Deleted = true;
          entry.Entity.DeletedDate = DateTimeOffset.UtcNow;
          break;

        default:
          break;
      }
    }
  }

  public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
  {
    SetAuditEntities();
    int result = await base.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
    return result;
  }

  public override int SaveChanges()
  {
    SetAuditEntities();
    return SaveChangesAsync().GetAwaiter().GetResult();
  }
}
