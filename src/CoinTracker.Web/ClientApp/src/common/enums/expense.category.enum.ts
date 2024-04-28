export enum ExpenseCategories {
    Groceries,
    Food,
    Utilities,
    Rent,
    Travel,
    Entertainment,
    Hotel,
    OnlinePurchase,
    Videogame,
    Service,
    Other
}

export const generateExpenseCategoriesOptions = (): {
    label: string;
    value: string;
  }[] => {
    return Object.keys(ExpenseCategories)
      .filter((key) => isNaN(Number(key))) // Filter out the numeric keys to get only the string keys
      .map((key, index) => ({
        label: key,
        value: index.toString(), // Use the index as the value if needed or you can map this differently
      }));
  };