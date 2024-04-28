import { Container, Divider, Group, Paper, Text, Title } from "@mantine/core";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { GoogleButton } from "./GoogleButton";
import "./style.css";
import { useState } from "react";
export function LoginForm() {
  const [loading, setLoading] = useState(false);
  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Text size="lg" fw={500}>
          Welcome to Cointracker, login with
        </Text>
        <Divider label="use" labelPosition="center" my="lg" />
        <Group grow mb="md" mt="md">
          <GoogleButton
            loading={loading}
            onClick={() => {
              setLoading(true);
              signInWithPopup(auth, new GoogleAuthProvider());
            }}
            radius="xl"
          >
            Google
          </GoogleButton>
        </Group>
      </Paper>
    </Container>
  );
}
