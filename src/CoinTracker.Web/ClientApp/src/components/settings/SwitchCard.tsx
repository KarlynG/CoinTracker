import { Card, Group, Switch, Text } from "@mantine/core";
import classes from "./SwitchesCard.module.css";

export function SwitchesCard() {
  
  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text fz="lg" className={classes.title} fw={500}>
        Track configuration
      </Text>
      <Text fz="xs" c="dimmed" mt={3} mb="xl">
        Choose whether or not you want this information to be tracked inside the
        application
      </Text>
      <Group
        justify="space-between"
        className={classes.item}
        wrap="nowrap"
        gap="xl"
      >
        <div>
          <Text>Total spent Month</Text>
          <Text size="xs" c="dimmed">
            The total amount you have spent in the month thus far
          </Text>
        </div>
        <Switch
          onLabel="ON"
          offLabel="OFF"
          className={classes.switch}
          size="lg"
        />
      </Group>
      <Group
        justify="space-between"
        className={classes.item}
        wrap="nowrap"
        gap="xl"
      >
        <div>
          <Text>Total spent Year</Text>
          <Text size="xs" c="dimmed">
            The total amount you have spent in the year thus far
          </Text>
        </div>
        <Switch
          onLabel="ON"
          offLabel="OFF"
          className={classes.switch}
          size="lg"
        />
      </Group>
      <Group
        justify="space-between"
        className={classes.item}
        wrap="nowrap"
        gap="xl"
      >
        <div>
          <Text>Total spent EVER</Text>
          <Text size="xs" c="dimmed">
            The amount you have spent ever since the account was created
          </Text>
        </div>
        <Switch
          onLabel="ON"
          offLabel="OFF"
          className={classes.switch}
          size="lg"
        />
      </Group>
    </Card>
  );
}
