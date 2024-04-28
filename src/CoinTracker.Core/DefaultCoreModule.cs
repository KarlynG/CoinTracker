using Autofac;
using CoinTracker.Core.Interfaces;
using CoinTracker.Core.Services;

namespace CoinTracker.Core;

/// <summary>
/// An Autofac module that is responsible for wiring up services defined in the Core project.
/// </summary>
public class DefaultCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<BudgetService>()
        .As<IBudgetService>()
        .InstancePerLifetimeScope();

    builder.RegisterType<TransactionService>()
        .As<ITransactionService>()
        .InstancePerLifetimeScope();
  }
}
