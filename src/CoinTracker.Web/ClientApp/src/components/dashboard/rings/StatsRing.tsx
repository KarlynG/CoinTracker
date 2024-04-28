import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
  Container,
} from "@mantine/core";
import PropBudget from "../interfaces/budgetprops";
interface AccumulatorType {
  totalUsedAmount: number;
  totalAmount: number;
}
export function StatsRing({ data }: Readonly<PropBudget>) {
  const result = data?.reduce(
    (accumulator, item) => {
      accumulator.totalUsedAmount += (item.expendedAmount ?? 0);
      accumulator.totalAmount += item.fullAmount;
      return accumulator;
    },
    { totalUsedAmount: 0, totalAmount: 0 }
  ) as AccumulatorType;
  const { totalUsedAmount, totalAmount } = result || { totalUsedAmount: 0, totalAmount: 0 };
  const percentage = Math.round((totalUsedAmount / totalAmount) * 100);
  return (
    <SimpleGrid cols={{ base: 1, sm: 1 }}>
      <Paper p="xs">
        <Container>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
            Used
          </Text>
          <Text fw={700} size="xl">
            ${totalUsedAmount}
          </Text>
        </Container>
        <Center>
          <Group>
            <RingProgress
              size={300}
              roundCaps
              thickness={20}
              sections={[
                {
                  value: percentage || 0,
                  color: "teal",
                },
              ]}
              label={
                <Center>
                  <Text fw={500} size="lg">
                    ${totalAmount}
                  </Text>
                </Center>
              }
            />
          </Group>
        </Center>
        <Container style={{ textAlign: "right" }}>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
            Not used
          </Text>
          <Text fw={700} size="xl">
            ${(totalAmount - totalUsedAmount) < 0 ? 0 : (totalAmount - totalUsedAmount)}
          </Text>
        </Container>
      </Paper>
    </SimpleGrid>
  );
}
