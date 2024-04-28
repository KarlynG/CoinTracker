import { Routes, Route } from "react-router-dom";
import { mainRouter } from "./main-router";
import {
  AppShell,
  Burger,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Header, Sidebar } from "../../components";
import { sidebarLinks } from "../../common/constants/navLinks";
import classes from "../../components/sidebar/Sidebar.module.css";
import { useEffect, useState } from "react";

export const DashboardRoutes = (): JSX.Element => {
  const [opened, setOpened] = useState(() => {
    const storedValue = localStorage.getItem("opened");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  useEffect(() => {
    localStorage.setItem("opened", JSON.stringify(opened));
  }, [opened]);
  const toggle = () => setOpened((prev: any) => !prev);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const bg =
    colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: !opened ? 100 : 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <AppShell.Navbar
        className={!opened ? classes.navbarCollapsed : classes.navbarOpened}
      >
        <Sidebar data={sidebarLinks} opened={opened} />
      </AppShell.Navbar>
      <AppShell.Header>
        <Header burger={<Burger opened={opened} onClick={toggle} />} />
      </AppShell.Header>
      <AppShell.Main bg={bg}>
        <Routes>
          {mainRouter.map((route, index) => (
            <Route
              key={"route" + index}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardRoutes;
