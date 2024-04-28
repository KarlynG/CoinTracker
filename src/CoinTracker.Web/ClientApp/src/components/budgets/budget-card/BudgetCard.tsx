import {
  Center,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus,
} from "@tabler/icons-react";
import PropBudget from "../../dashboard/interfaces/budgetprops";
import classes from "./StatsGrid.module.css";
import { useNavigate } from "react-router-dom";
import "./BudgetCard.module.css";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};
export default function BudgetCard({ data }: Readonly<PropBudget>) {
  const navigate = useNavigate();

  const handleClick = (budgetId: string = "") => {
    navigate(`/budgets/${budgetId}`);
  };

  const firstThreeElements = data?.slice(0, 3);
  const stats = firstThreeElements?.map((stat) => {
    const Icon = icons["coin"];
    return (
      <Paper
        className="budget-card"
        onClick={() => handleClick(stat.id)}
        withBorder
        p="md"
        radius="md"
        key={stat.id}
        styles={() => ({
          root: {
            cursor: "pointer",
            minWidth: "8rem"
          },
        })}
      >
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.name}
          </Text>
          <Icon className="" size="1.4rem" stroke={1.5} />
        </Group>

        <Group justify="space-between" align="flex-start" gap="xs" mt={25}>
          <RingProgress
            size={100}
            roundCaps
            thickness={5}
            sections={[
              {
                value: Math.round(
                  (stat.expendedAmount! / stat.fullAmount) * 100
                ),
                color: "teal",
              },
            ]}
            label={
              <Center>
                <Text fw={600} size="sm">
                  ${stat.fullAmount}
                </Text>
              </Center>
            }
          />
          <Stack>
            <div>
              <Text c="dimmed" size="xs" fw={700}>
                Not used
              </Text>
              <Text fw={700} size="md">
                ${(stat.fullAmount - stat.expendedAmount!) < 0 ? 0 : (stat.fullAmount - stat.expendedAmount!)}
              </Text>
            </div>
            <div>
              <Text c="dimmed" size="xs" fw={700}>
                Used
              </Text>
              <Text fw={700} size="md">
                ${stat.expendedAmount}
              </Text>
            </div>
          </Stack>
        </Group>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      {firstThreeElements?.length ? (
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
          {stats}
          {(firstThreeElements?.length) == 3 && (
            <UnstyledButton
              onClick={() => handleClick()}
              className={classes.item}
            >
              <Text size="xs" mt={7} fw={600}>
                See all{" "}
                  ➡️
              </Text>
            </UnstyledButton>
          )}
        </SimpleGrid>
      ) : (
        <Center>
          <Title order={4}>No budgets Found!</Title>
        </Center>
      )}
    </div>
  );
}
