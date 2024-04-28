import { MarkChart } from "../types/chart.type";

export const generateBudgetMarks = (budget: number): MarkChart[] => {
  // Calculate step size to always produce exactly 10 steps
  const step = budget / 10;

  // Initialize an empty array for the marks
  let marks: MarkChart[] = [];

  // Helper function to format the label
  const formatLabel = (value: number) => {
    if (value >= 1000 && value < 1000000) {
      return `${(value / 1000).toFixed(0)}K`; // Format in thousands
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`; // Format in millions
    }
    return value.toString(); // Format as it is for values less than 1000
  };

  // Generate marks up to the budget, incremented by 'step'
  for (let i = step; i <= budget; i += step) {
    marks.push({ value: i, label: formatLabel(i) });
  }

  // Make sure to include the end point if not exactly divisible by step
  if (marks[marks.length - 1].value !== budget) {
    marks.push({ value: budget, label: formatLabel(budget) });
  }

  return marks;
};
