import { Center, Stack } from "@mantine/core";
import { SidebarLink } from "../../common/types/navItem";
import classes from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SideBarLinkIcon } from "..";

interface Props {
  data: SidebarLink[];
  opened: boolean;
}

export default function Sidebar({ data, opened }: Readonly<Props>) {
  const [active, setActive] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const activeIndex = data.findIndex((link) => {
      if (link.link === '/') {
        return location.pathname === link.link;
      } else {
        return location.pathname.includes(link.link!);
      }
    });
    setActive(activeIndex >= 0 ? activeIndex : 0);
  }, [location, data]);
  

  const links = data.map((sidebarLink: SidebarLink, index) => (
    <SideBarLinkIcon
      key={sidebarLink.label}
      isOpened={opened}
      data={{
        active: index === active,
        onClick: () => setActive(index),
        ...sidebarLink,
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <div className={classes.navbarMain}>
          <Stack justify="center" gap={12}>
            {links}
          </Stack>
        </div>
      </Center>
    </nav>
  );
}
