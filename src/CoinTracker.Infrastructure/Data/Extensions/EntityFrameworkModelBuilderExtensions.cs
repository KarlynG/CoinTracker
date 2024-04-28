using System.Reflection;
using CoinTracker.Core.Abstract;
using Microsoft.EntityFrameworkCore;

namespace CoinTracker.Infrastructure.Data.Extensions;

public static class EntityFrameworkModelBuilderExtensions
{
  public static void SetSoftDeleteFilter(this ModelBuilder modelBuilder, Type entityType)
  {
    SetSoftDeleteFilterMethod.MakeGenericMethod(entityType).Invoke(null, new object[] { modelBuilder });
  }

  static readonly MethodInfo SetSoftDeleteFilterMethod = typeof(EntityFrameworkModelBuilderExtensions)
    .GetMethods(BindingFlags.Public | BindingFlags.Static)
    .Single(t => t.IsGenericMethod && t.Name == "SetSoftDeleteFilter");

  public static void SetSoftDeleteFilter<TEntity>(this ModelBuilder modelBuilder) where TEntity : BaseEntity
  {
    if (modelBuilder.Model.FindEntityType(typeof(TEntity))?.GetRootType() == modelBuilder.Model.FindEntityType(typeof(TEntity)))
    {
      modelBuilder.Entity<TEntity>().HasQueryFilter(x => !x.Deleted);
    }
  }
}
