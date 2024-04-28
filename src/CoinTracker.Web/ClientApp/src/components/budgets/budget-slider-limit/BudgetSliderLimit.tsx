import React from "react";
import { Card, Flex, Skeleton, Slider, Text } from "@mantine/core";
import { generateBudgetMarks } from "../../../common/utils/chart.utils";
import { Budget } from "../../../models";
import { formatCurrency } from "../../../common/utils/currencyAmount.utils";
import { getLimitPeriodName } from "../../../common/utils/enum.utils";

interface BudgetSliderLimitProps {
  budget?: Budget;
  selectedMonth?: string;
  isLoading: boolean;
}

export const BudgetSliderLimit: React.FC<BudgetSliderLimitProps> = ({
  budget,
  selectedMonth,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Flex justify={"space-between"} align={"center"} mb={"25"}>
          <Skeleton height={20} width={200} radius="md" />
          <Skeleton height={20} width={300} radius="md" />
        </Flex>
        <Skeleton height={28} radius="md" mt="md" />
      </Card>
    );
  }

  // Calculate values only when not loading and data is available
  const expensesTransactions = budget?.transactions?.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (transactionDate.getMonth() + 1).toString() === selectedMonth;
  }).reduce((acc, curr) => acc + curr.amount, 0) ?? 0;

  const budgetsMarks = generateBudgetMarks(budget?.limit ?? 0);

  const colorLimitAmount = expensesTransactions > (budget?.limit ?? 0) ? "#990404" : "green";

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex justify={"space-between"} align={"center"} mb={"lg"}>
        <Text fw={"bold"} size="md">
          {getLimitPeriodName(budget?.limitPeriod!)} limits
        </Text>
        <Text size="md">
          <span style={{ fontWeight: "bold", color: colorLimitAmount }}>
            {formatCurrency(expensesTransactions, budget?.currency!)}
          </span> 
          {" out of "}
          <span style={{ fontWeight: "bold" }}>
            {formatCurrency(budget?.limit ?? 0, budget?.currency!)}
          </span>
        </Text>
      </Flex>
      <Slider
        mb={"lg"}
        color="blue"
        size={"xl"}
        thumbSize={22}
        value={expensesTransactions}
        min={0}
        max={budget?.limit ?? 0}
        marks={budgetsMarks}
      />
    </Card>
  );
};

export default BudgetSliderLimit;
