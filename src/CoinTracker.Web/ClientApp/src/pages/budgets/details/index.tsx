import { Badge, Box, Card, Flex, Grid, Text } from "@mantine/core";
import {
  BudgetSliderLimit,
  BudgetTransactionLinearChart,
  BudgetTransactionSection,
} from "../../../components";
import useBudgetById from "../../../hooks/budgets/useBudgetById";
import { useUserStore } from "../../../store/session/session";
import { useParams } from "react-router-dom";
import useTransactionsPaginated from "../../../hooks/transactions/useTransactionsPaginated";
import { TransactionTable } from "../../../components/dashboard/transactions-table/TransactionTable";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCurrencyName } from "../../../common/utils/enum.utils";

export const BudgetDetails = () => {
  const { firebaseUser, hasAnimated, setHasAnimated } = useUserStore();
  const [selectedMonth, setSelectedMonth] = useState<string>(""); // State to keep track of the selected month
  const [filters, setFilters] = useState({});
  const { id } = useParams(); // Extract the id from the URL

  const {
    data,
    isLoading: isLoadingBudgetById,
    refetch: refetchBudgetById,
  } = useBudgetById(firebaseUser?.uid!, id!);
  const {
    data: transactions,
    isLoading,
    refetch,
  } = useTransactionsPaginated(id!, firebaseUser?.uid!, 1, 10, filters);

  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated();
    }
  }, [hasAnimated, setHasAnimated]);

  const slideUpVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.6,
      },
    },
  };

  const bounceInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    bounce: {
      x: [0, -20, 0, -10, 0],
      transition: {
        duration: 1,
        times: [0, 0.2, 0.4, 0.6, 0.8],
        loop: Infinity,
      },
    },
  };

  const delayedBounceInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.3,
      },
    },
    bounce: {
      x: [0, -20, 0, -10, 0],
      transition: {
        duration: 1,
        times: [0, 0.2, 0.4, 0.6, 0.8],
        loop: Infinity,
        delay: 0.3,
      },
    },
  };

  return (
    <div className="my-container">
      <Box mb={"xl"}>
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          variants={bounceInVariants}
        >
          {isLoadingBudgetById ? (
            <Text>Loading...</Text>
          ) : (
            <Flex gap={"md"}>
              <Text size={"xl"} fw={"bold"}>
                {data?.name}
              </Text>
              <Badge
                ml={"xs"}
                size="xl"
                radius={"md"}
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
              >
                {getCurrencyName(data?.currency!)}
              </Badge>
            </Flex>
          )}
        </motion.div>
      </Box>
      <Grid grow gutter="xl">
        <Grid.Col span={6}>
          <motion.div
            initial={"hidden"}
            animate={"visible"}
            variants={bounceInVariants}
          >
            <BudgetTransactionSection
              onSelectedMonthChange={(month) => setSelectedMonth(month)}
              budget={data}
              isLoading={isLoadingBudgetById}
            />
          </motion.div>
        </Grid.Col>
        <Grid.Col span={6}>
          <motion.div
            initial={"hidden"}
            animate={"visible"}
            variants={delayedBounceInVariants}
          >
            <BudgetSliderLimit
              selectedMonth={selectedMonth}
              budget={data}
              isLoading={isLoadingBudgetById}
            />
            <BudgetTransactionLinearChart isLoading={isLoadingBudgetById} budget={data} />
          </motion.div>
        </Grid.Col>
      </Grid>
      <Grid mt={"xl"}>
        <Grid.Col span={12}>
          <motion.div
            initial={"hidden"}
            animate={"visible"}
            variants={slideUpVariants}
          >
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <TransactionTable
                data={transactions}
                isLoading={isLoading}
                budget={data}
                showButtonAddTransaction={true}
                onFilterChange={(filterObject) => {
                  setFilters(filterObject);
                }}
                onTransactionModified={() => {
                  refetch();
                  refetchBudgetById();
                }}
              />
            </Card>
          </motion.div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default BudgetDetails;
