import {
  IconCoins,
  IconDashboard,
  IconSettings,
} from "@tabler/icons-react";
import { SidebarLink } from "../types/navItem";

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    icon: IconDashboard,
    link: "/",
  },
  {
    label: "Budgets",
    icon: IconCoins,
    link: "/budgets",
  },
  {
    label: "Settings",
    icon: IconSettings,
    link: "/settings",
  },
];
