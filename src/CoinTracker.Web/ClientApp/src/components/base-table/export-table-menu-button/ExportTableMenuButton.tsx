import React from "react";
import { Button, Menu, rem } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { ButtonOptions } from "../../../common/types/tableConfig";

type ExportMenuButtonProps = {
  buttonExportOptions: ButtonOptions[];
  renderMenuItem: (buttonOption: ButtonOptions, index: number) => React.ReactNode;
};

const ExportTableMenuButton: React.FC<ExportMenuButtonProps> = ({
  buttonExportOptions,
  renderMenuItem,
}) => {
  if (buttonExportOptions.length === 0) {
    return null;
  }

  return (
    <Menu
      transitionProps={{ transition: "fade-down" }}
      position="bottom-end"
      width={100}
      withinPortal
    >
      <Menu.Target>
        <Button
          variant="outline"
          rightSection={
            <IconChevronDown
              style={{ width: rem(15), height: rem(15) }}
              stroke={1.5}
            />
          }
          pr={12}
        >
          Export
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {buttonExportOptions.map((buttonOption, index) =>
          renderMenuItem(buttonOption, index)
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ExportTableMenuButton;
