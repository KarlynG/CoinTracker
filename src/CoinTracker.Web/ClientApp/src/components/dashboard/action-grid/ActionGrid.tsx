import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  useMantineTheme,
  Modal,
} from "@mantine/core";
import { IconRepeat, IconReport, IconCoin, IconAlertCircle } from "@tabler/icons-react";
import classes from "./ActionsGrid.module.css";
import AddOrEditBudget from "../../budgets/AddOrEditBudget";
import { useDisclosure } from "@mantine/hooks";
import AddOrEditTransaction from "../../transactions/AddOrEditTransaction";
import { notifications } from "@mantine/notifications";

interface ActionGridProps{
  action: () => void;
}
export default function ActionGrid(props: Readonly<ActionGridProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedTransactionModal, { open: openTransactionModal, close: closeTransactionModal }] = useDisclosure(false);
  const theme = useMantineTheme();

  const showToastFuncionalityNotAvailable = () => {
    notifications.show({
      id: "funcionality-not-available",
      message: `This functionality is not available yet.`,
      color: "orange",
      loading: false,
      autoClose: true,
      icon: <IconAlertCircle />,
    });
  };

  const mockdata = [
    {
      title: "New Transaction",
      icon: IconRepeat,
      color: "blue",
      action: () => openTransactionModal(),
    },
    {
      title: "New Budget",
      icon: IconCoin,
      color: "red",
      action: () => open(),
    },
    { title: "Reports", icon: IconReport, color: "pink", action: () => showToastFuncionalityNotAvailable() },
  ];
  
  const handlerCreatingBudget = () => {
    close();
    props.action();
  };

  const items = mockdata.map((item) => (
    <UnstyledButton
      onClick={item.action}
      key={item.title}
      className={classes.item}
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between">
          <Text className={classes.title}>Services</Text>
          <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
            {mockdata.length} services availables
          </Anchor>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        size={"lg"}
        title={"Add Budget"}
        centered
      >
        <AddOrEditBudget
          budgetToEdit={undefined}
          onBudgetCreated={() => {
            handlerCreatingBudget();
          }}
        />
      </Modal>
      <Modal
        opened={openedTransactionModal}
        onClose={closeTransactionModal}
        size={"lg"}
        title={"Add Transaction"}
        centered
      >
        <AddOrEditTransaction
          onTransactionModified={() => {
            closeTransactionModal();
            props.action();
          }}
        />
      </Modal>
    </>
  );
}
