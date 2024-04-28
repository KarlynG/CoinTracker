export enum RecurrenceFrequency {
  Daily,
  Monthly,
  Yearly,
}

export const generateRecurrenceFrequencyOptions = (): {
  label: string;
  value: string;
}[] => {
  return Object.keys(RecurrenceFrequency)
    .filter((key) => isNaN(Number(key))) // Filter out the numeric keys to get only the string keys
    .map((key, index) => ({
      label: key,
      value: index.toString(), // Use the index as the value if needed or you can map this differently
    }));
};
