import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  RingProgress,
  ColorSwatch,
  Flex,
  Box,
  Select,
  Title,
  Avatar,
  Skeleton,
} from "@mantine/core";
import { Budget } from "../../../models";
import { BudgetTransaction } from "../../../models/transactions/budgetTransaction.model";
import { ExpenseCategories } from "../../../common/enums";
import { months } from "../../../common/utils/date.utils";
import { IconTrendingDown } from "@tabler/icons-react";
import { formatCurrency } from "../../../common/utils/currencyAmount.utils";

// Utility functions
const generateDistinctColors = (count: number) => {
  let colors = [];
  let lastHue = Math.random() * 360;
  for (let i = 0; i < count; i++) {
    lastHue = (lastHue + (360 / count) * (0.5 + Math.random() * 0.5)) % 360;
    const color = `hsl(${lastHue}, 70%, 60%)`;
    colors.push(color);
  }
  return colors;
};

const calculateExpensesByCategory = (
  transactions: BudgetTransaction[],
  selectedMonth: string | null
): Record<string, number> => {
  const filteredTransactions = selectedMonth
    ? transactions.filter(
        (transaction) =>
          new Date(transaction.date).getMonth() + 1 === parseInt(selectedMonth)
      )
    : transactions;

  const expenses = filteredTransactions.reduce(
    (acc: Record<string, number>, transaction) => {
      const categoryKey = ExpenseCategories[transaction.category];
      if (!acc[categoryKey]) {
        acc[categoryKey] = 0;
      }
      acc[categoryKey] += transaction.amount;
      return acc;
    },
    {}
  );
  return expenses;
};

const calculatePercentageByCategory = (
  expenses: Record<string, number>,
  limit: number
) => {
  const totalExpenses: number = Object.values(expenses).reduce(
    (sum: number, current: number) => sum + current,
    0
  );
  const base: number = totalExpenses > limit ? totalExpenses : limit;

  return Object.keys(expenses).map((categoryKey: string) => ({
    category: categoryKey,
    percentage: (expenses[categoryKey] / base) * 100,
  }));
};

// Component
interface BudgetTransactionSectionProps {
  budget?: Budget;
  onSelectedMonthChange: (month: string) => void;
  isLoading: boolean;
}

const BudgetTransactionSection: React.FC<BudgetTransactionSectionProps> = ({
  budget,
  onSelectedMonthChange,
  isLoading,
}) => {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<string | null>(
    currentMonth.toString()
  );
  const [sections, setSections] = useState<
    Array<{ value: number; color: string; tooltip: string }>
  >([]);

  useEffect(() => {
    if (budget?.transactions && budget.limit) {
      onSelectedMonthChange(selectedMonth!);
      const expenses = calculateExpensesByCategory(
        budget.transactions,
        selectedMonth
      );
      const percentages = calculatePercentageByCategory(expenses, budget.limit);
      const colors = generateDistinctColors(percentages.length);
      const newSections = percentages.map((data, index) => ({
        value: data.percentage,
        color: colors[index],
        tooltip: `${data.category}`,
      }));
      setSections(newSections);
    }
  }, [budget, selectedMonth]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Flex
          mt={"70"}
          ml={"20"}
          gap={"35"}
          align={"center"}
          direction={{ base: "column", sm: "row" }}
        >
          <Skeleton circle height={250} width={250} />
          <Flex wrap="wrap" gap={"xl"}>
            <Skeleton height={30} width={100} radius="md" />
            <Skeleton height={30} width={100} radius="md" />
            <Skeleton height={30} width={100} radius="md" />
          </Flex>
        </Flex>
      );
    } else if (sections.length !== 0) {
      return (
        <Flex
          mt={"50"}
          gap={"35"}
          align={"center"}
          direction={{ base: "column", sm: "row" }}
        >
          <Box>
            <RingProgress
              size={300}
              thickness={28}
              sections={sections}
              label={
                <Flex direction={"column"} gap={"20"}>
                  <Text
                    size="sm"
                    ta="center"
                    fw={"bold"}
                    px="xs"
                    style={{ pointerEvents: "none" }}
                  >
                    Total
                  </Text>
                  <Text
                    size="xl"
                    ta="center"
                    px="xs"
                    fw={"bold"}
                    style={{ pointerEvents: "none" }}
                  >
                    {formatCurrency(budget?.limit!, budget?.currency!)}
                  </Text>
                </Flex>
              }
            />
          </Box>
          <Flex wrap="wrap" gap={"xl"}>
            {sections.map((section, index) => (
              <Flex
                align={"center"}
                key={"Color" + index}
                w={"100%"}
                mah={"30px"}
                maw={"135px"}
              >
                <ColorSwatch radius={"2"} color={section.color} />
                <Text size="xs" ta="center" px="xs">
                  {`${section.tooltip} - ${section.value.toFixed(2)}%`}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      );
    } else {
      return (
        <Flex
          direction={"column"}
          mt={"50"}
          gap={"10"}
          align={"center"}
          justify={"center"}
        >
          <Avatar color="gray" style={{ width: 180, height: 180 }} radius="100">
            <IconTrendingDown style={{ width: 130, height: 130 }} />
          </Avatar>

          <Title size="26" fw={"bold"}>
            Oh, graph!
          </Title>
          <Text size="lg">There is no data available for this budget.</Text>
        </Flex>
      );
    }
  };

  return (
    <Card
      h={{ base: "auto", md: "460px" }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Flex justify={"space-between"}>
        <Text size="md" fw="bold">
          Expenses by category
        </Text>
        <Box>
          <Select
            size="sm"
            w={200}
            placeholder="Select a Month"
            value={selectedMonth}
            data={months}
            onChange={(event) => {
              setSelectedMonth(event);
            }}
          />
        </Box>
      </Flex>
      {renderContent()}
    </Card>
  );
};

export default BudgetTransactionSection;
