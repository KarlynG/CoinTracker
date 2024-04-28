import { useState, useEffect } from "react";
import { Box, Card, Flex, Select, Skeleton, Text } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { format } from "date-fns"; // Directly use Date objects with format
import { Budget } from "../../../models/budgets/budget.model";
import { BudgetTransaction } from "../../../models/transactions/budgetTransaction.model";
import { IconChartBarOff } from "@tabler/icons-react";

interface ExpenseData {
  date: string;
  Expenses: number;
}

interface BudgetTransactionLinearChartProps {
  budget?: Budget;
  isLoading: boolean;
}

export const BudgetTransactionLinearChart: React.FC<
  BudgetTransactionLinearChartProps
> = ({ budget, isLoading }) => {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<ExpenseData[]>([]);

  useEffect(() => {
    if (budget?.transactions) {
      const aggregated = aggregateExpensesByMonth(budget.transactions);
      setExpenses(aggregated);
      setFilteredData(aggregated);
    }
  }, [budget]);

  const aggregateExpensesByMonth = (transactions: BudgetTransaction[]) => {
    const expensesByMonth: Record<string, number> = {};
    transactions.forEach((tx) => {
      const month = format(tx.date, "MMMM"); // Use Date object directly with format
      expensesByMonth[month] = (expensesByMonth[month] || 0) + tx.amount;
    });
    return Object.entries(expensesByMonth).map(([date, Expenses]) => ({
      date,
      Expenses,
    }));
  };

  const filterExpensesByDay = (month: string) => {
    const monthExpenses =
      budget?.transactions?.filter((tx) => format(tx.date, "MMMM") === month) ||
      [];
    const expensesByDay: Record<string, number> = {};
    monthExpenses.forEach((tx) => {
      const day = format(tx.date, "MMMM d");
      expensesByDay[day] = (expensesByDay[day] || 0) + tx.amount;
    });
    return Object.entries(expensesByDay).map(([date, Expenses]) => ({
      date,
      Expenses,
    }));
  };

  const handleMonthChange = (month: string | null) => {
    setSelectedMonth(month);
    if (month) {
      const detailedData = filterExpensesByDay(month);
      setFilteredData(detailedData);
    } else {
      setFilteredData(expenses);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box h={210}>
          <Flex justify="space-around" align="flex-end" mt="lg">
            <Skeleton height={150} width={40} radius="md" />
            <Skeleton height={180} width={40} radius="md" />
            <Skeleton height={100} width={40} radius="md" />
            <Skeleton height={120} width={40} radius="md" />
          </Flex>
        </Box>
      );
    } else if (filteredData.length > 0) {
      return (
        <AreaChart
          h={210}
          data={filteredData}
          dataKey="date"
          series={[{ name: "Expenses", color: "blue" }]}
          curveType="natural"
          tickLine="none"
          gridAxis="none"
        />
      );
    } else {
      return (
        <Flex align="center" justify="center" gap="xl" h="210">
          <IconChartBarOff style={{ width: 100, height: 100 }} />
          <Text size="xl" fw="bold">
            No data available for this budget
          </Text>
        </Flex>
      );
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt={"xl"}>
      <Flex justify={"space-between"}>
        <Text size="md" fw="bold" mb={"lg"}>
          Expenses Over Time
        </Text>
        <Box>
          <Select
            size="sm"
            w={200}
            placeholder="Select a Month"
            clearable
            data={expenses.map((item) => ({
              value: item.date,
              label: item.date,
            }))}
            value={selectedMonth ?? ""}
            onChange={(e) => handleMonthChange(e)}
          />
        </Box>
      </Flex>
      {renderContent()}
    </Card>
  );
};

export default BudgetTransactionLinearChart;
