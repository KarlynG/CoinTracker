import { Currency, ExpenseCategories, LimitPeriod, TransactionType } from "../enums";

export const getCurrencyName = (currency: Currency) => {
  return Currency[currency];
};

export const formatValueSelectToEnum = <T>(value: string, enumObject: { [s: string]: T }): T => {
  const enumKey = Object.keys(enumObject).find(
    (key) => enumObject[key as any] === parseInt(value)
  );
  const enumValue = enumKey
    ? enumObject[enumKey as keyof typeof enumObject]
    : enumObject[Object.keys(enumObject)[0]]; // Default to the first enum value if not found

  return enumValue;
};

export const getLimitPeriodName = (limitPeriod: LimitPeriod) => {
  return LimitPeriod[limitPeriod];
};

export const getExpenseCategoryName = (expense: ExpenseCategories) => {
  return ExpenseCategories[expense];
};

export const getTransactionTypeName = (transactionType: TransactionType) => {
  return TransactionType[transactionType];
};
