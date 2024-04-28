using AutoMapper;
using CoinTracker.Core.Abstract;
using CoinTracker.Core.Aggregates.RecurringTransactions;
using CoinTracker.Core.Aggregates.TransactionAggregate;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Enums;
using CoinTracker.Infrastructure.Config.Resolvers;
using CoinTracker.UseCases.Budget;
using CoinTracker.UseCases.Transaction;
using CoinTracker.UseCases.Transaction.Create.Dtos;
using CoinTracker.UseCases.Users;

namespace CoinTracker.Infrastructure.Config;

public class MainMapperProfile : Profile
{
  public MainMapperProfile()
  {
    // Add Mapping profiles here
    CreateMap<User, UserDto>().ReverseMap();
    CreateMap<UserBudget, BudgetDto>()
      .ForMember(dest => dest.ExpendedAmount, opt => opt.MapFrom<ExpendedAmountResolver>())
      .ReverseMap();
    CreateMap<BudgetTransaction, BudgetTransactionDto>()
      .ForMember(dest => dest.Type, opt => opt.MapFrom(x => x.RecurringTransaction != null ? TransactionType.Recurrent : TransactionType.OneTime))
      .ReverseMap();
    CreateMap<BudgetTransaction, CreateTransactionDto>().ReverseMap();
    CreateMap<RecurringTransaction, RecurringTransactionDto>().ReverseMap();
    CreateMap<BasePaginatedResponse<UserBudget>, BasePaginatedResponse<BudgetDto>>().ReverseMap();
    CreateMap<BasePaginatedResponse<BudgetTransaction>, BasePaginatedResponse<BudgetTransactionDto>>()
      .ReverseMap();
  }
}
