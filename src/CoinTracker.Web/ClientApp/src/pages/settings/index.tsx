import { useEffect, useState } from "react";
import userService from "../../services/users/user.service";
import { useUserStore } from "../../store/session/session";
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Modal,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { User } from "../../models/user/user.model";
import { SwitchesCard } from "../../components/settings/SwitchCard";
const stats = [
  { value: "$0", label: "Spent Monthly" },
  { value: "$0", label: "Spent Yearly" },
  { value: "$0", label: "Spent since day 1" },
];
export const Settings = () => {
  const { firebaseUser, logOutUser } = useUserStore();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [secondLoader, setSecondLoader] = useState(false);
  const handleDelete = () => {
    setSecondLoader(true);
    userService.delete(firebaseUser?.uid!).then(() => {
      setTimeout(logOutUser, 2000);
    });
  };
  useEffect(() => {
    const getUser = async () => {
      if (firebaseUser) {
        let result = await userService.getById(firebaseUser.uid);
        setUser(result);
      }
    };
    getUser();
  }, []);
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));
  return (
    <Container my="md">
      <Title order={2}>Account settings</Title>
      <br />
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Card padding="lg">
          <Group>
            <Avatar
              src={firebaseUser?.photoURL}
              alt="Jacob Warnhalter"
              radius="xl"
              size="xl"
            />
            <div>
              <Text fz="lg">{firebaseUser?.displayName}</Text>
              <Text fz="lg">{user ? user.lastName : ""}</Text>
            </div>
          </Group>
          <div style={{ marginTop: "5rem" }}>
            <Group mt="md" justify="center" gap={30}>
              {items}
            </Group>
          </div>
        </Card>
        <Grid gutter="md">
          <Grid.Col>
            <SwitchesCard />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      <Modal
        opened={loading}
        onClose={() => setLoading(false)}
        title="Are you sure you want to delete your account?"
        transitionProps={{ transition: "rotate-left" }}
        centered
      >
        <Group>
          <Button
            variant="light"
            size="md"
            radius="md"
            onClick={() => setLoading(false)}
          >
            No
          </Button>
          <Button
            loading={secondLoader}
            onClick={handleDelete}
            variant="light"
            color="red"
            size="md"
            radius="md"
          >
            Yes, I am sure
          </Button>
        </Group>
      </Modal>
      <Button
        style={{ marginTop: "2rem" }}
        variant="light"
        color="red"
        size="md"
        radius="md"
        fullWidth
        loading={loading}
        onClick={() => {
          setLoading(true);
        }}
      >
        Delete account
      </Button>
    </Container>
  );
};

export default Settings;
