import { Tooltip, UnstyledButton, Box, rem, Text } from "@mantine/core";
import { SidebarLink } from "../../../common/types/navItem";
import classes from "./SidebarLink.module.css";
import { useNavigate } from "react-router-dom";

interface SideBarLinksProps {
  data: SidebarLink;
  isOpened: boolean;
}

export default function SideBarLinkIcon({
  data: { label, icon: Icon, active, link },
  isOpened,
}: Readonly<SideBarLinksProps>) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        className={isOpened ? classes.link : classes.linkCollapsed}
        data-active={active || undefined}
        onClick={handleClick}
      >
        <Box
          className={
            !isOpened ? classes.boxLinkIcon : classes.boxLinkIconCollapsed
          }
        >
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          {isOpened && <Text>{label}</Text>}
        </Box>
      </UnstyledButton>
    </Tooltip>
  );
}
