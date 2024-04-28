export enum LimitPeriod {
  Daily,
  Biweekly,
  Monthly,
  Annual,
}

export const generateLimitPeriodOptions = (): {
  label: string;
  value: string;
}[] => {
  return Object.keys(LimitPeriod)
    .filter((key) => isNaN(Number(key))) // Filter out the numeric keys to get only the string keys
    .map((key, index) => ({
      label: key,
      value: index.toString(), // Use the index as the value if needed or you can map this differently
    }));
};