import { Avatar, Group, Menu, UnstyledButton, rem, Text } from "@mantine/core";
import classes from "./Header.module.css";
import {
  IconChevronDown,
  IconSettings,
  IconLogout,
  IconPalette,
} from "@tabler/icons-react";
import { useState } from "react";
import cx from "clsx";
import { useUserStore } from "../../store/session/session";
import { ActionToggle } from "..";
import { useNavigate } from "react-router-dom";

interface Props {
  burger?: React.ReactNode;
}

export default function Header({ burger }: Readonly<Props>) {
  const { logOutUser, firebaseUser } = useUserStore();
  const [userMenuOpened, setUserMenuOpened] = useState(true);
  const navigate = useNavigate();
  const goToSettings = () => {
    navigate("/settings");
  };
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <div className={classes.headerLogoContainer}>
          <Group
            onClick={() => {
              navigate("/");
            }}
            gap={"sm"}
            style={{ cursor: "pointer" }}
            justify="space-between"
          >
            <Avatar size={40} src="/ct.png" radius={40} />
            <Text className="hide-on-mobile" size="xl">
              CoinTracker
            </Text>
          </Group>
          {burger}
        </div>
        <div className={classes.userMenu}>
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Avatar
                    src={firebaseUser?.photoURL}
                    alt={firebaseUser?.displayName!}
                    radius="xl"
                    size={20}
                  />
                  <Text
                    className="hide-on-mobile"
                    fw={500}
                    size="sm"
                    lh={1}
                    mr={3}
                  >
                    {firebaseUser?.displayName}
                  </Text>
                  <IconChevronDown
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                onClick={goToSettings}
                leftSection={
                  <IconSettings
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconPalette
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                rightSection={<ActionToggle />}
              >
                Theme (Light/Dark)
              </Menu.Item>
              <Menu.Item
                onClick={logOutUser}
                leftSection={
                  <IconLogout
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </header>
  );
}
