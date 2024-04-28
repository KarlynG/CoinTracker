import {
  Center,
  Grid,
  GridCol,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { PagedResponse } from "../../common/types/tableConfig";
import useBudgetsPaginated from "../../hooks/budgets/useBudgetsPaginated.hook";
import { BudgetTransaction } from "../../models/transactions/budgetTransaction.model";
import { useUserStore } from "../../store/session/session";
import BudgetCard from "../budgets/budget-card/BudgetCard";
import ActionGrid from "./action-grid/ActionGrid";
import { StatsRing } from "./rings/StatsRing";
import "./style.css";
import { TransactionTable } from "./transactions-table/TransactionTable";
import DashboardJoyride from "./dashboard-joyride/DashboardJoyride";
const Dashboard = () => {
  const { firebaseUser, hasAnimated, setHasAnimated } = useUserStore();
  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated();
    }
  }, [hasAnimated, setHasAnimated]);
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
  const { data, isLoading, refetch } = useBudgetsPaginated(
    firebaseUser?.uid!,
    1,
    10
  );
  const getLatestTransactions = (): BudgetTransaction[] => {
    // Flatten the transactions from all budgets into a single array
    if (data == undefined) return [];

    const allTransactions = data.items.flatMap(
      (budget) => budget.transactions || [] // Ensure no undefined transactions are added
    );

    // Sort the transactions based on their createdDate in descending order
    const sortedTransactions = [...allTransactions].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Take the first 10 items from the sorted array
    const latestTransactions = sortedTransactions.slice(0, 10);

    return latestTransactions;
  };

  const transactionResponse: PagedResponse<BudgetTransaction> = {
    items: getLatestTransactions(),
    totalRecords: getLatestTransactions().length,
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
  };

  return (
    <div className="my-container">
      <DashboardJoyride />
      <Grid className="container-login" grow gutter="xl">
        <GridCol span={2}>
          <motion.div
            initial={hasAnimated ? false : "hidden"}
            animate={hasAnimated ? false : "visible"}
            variants={bounceInVariants}
          >
            <Title order={1}>Hello {firebaseUser?.displayName}</Title>
            <Text size="lg">Take a look at your current balance 👀</Text>
            <div style={{ marginBottom: "2rem" }} className="first-step">
              {data ? (
                <div>
                  <StatsRing data={data.items} />
                </div>
              ) : (
                <Center style={{ marginTop: "5rem", marginBottom: "5rem" }}>
                  <Skeleton height={250} circle />
                </Center>
              )}
            </div>
            <div className="second-step">
              <ActionGrid action={refetch} />
            </div>
          </motion.div>
        </GridCol>

        <GridCol span={7}>
          <motion.div
            initial={hasAnimated ? false : "hidden"}
            animate={hasAnimated ? false : "visible"}
            variants={delayedBounceInVariants}
          >
            <div className="third-step">
              <Text size="lg" style={{ marginLeft: "3rem" }}>
                Your current budgets
              </Text>
              {data ? (
                <BudgetCard data={data.items} />
              ) : (
                <div style={{ marginLeft: "3rem" }}>
                  <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
                    <Skeleton radius="md" height={150} width={300} />
                    <Skeleton height={150} width={300} />
                    <Skeleton height={150} width={300} />
                  </SimpleGrid>
                </div>
              )}
            </div>
            <div
              className="fourth-step"
              style={{ marginLeft: "3rem", marginRight: "3rem" }}
            >
              <TransactionTable
                onTransactionModified={() => {
                  refetch();
                }}
                data={transactionResponse}
                isLoading={isLoading}
              />
            </div>
          </motion.div>
        </GridCol>
      </Grid>
    </div>
  );
};

export default Dashboard;
