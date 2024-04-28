import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  Loader,
  Button,
  Text,
  Menu,
  Group,
  ActionIcon,
  Tooltip,
  Modal,
  TextInput,
  rem,
  Box,
  Flex,
} from "@mantine/core";
import { ButtonOptions, TableConfig } from "../../common/types/tableConfig";
import {
  IconDatabaseOff,
  IconDotsVertical,
  IconFilter,
  IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import GenericFilterModal from "../generic-filter/GenericFilter";
import { ExportTableMenuButton, PaginationTable } from "..";
import Th from "./th-table/Th";

type Props<T> = {
  config: TableConfig<T>;
  handlePageChange: (page: number, pageSize: number) => void;
  handleFilterChange?: (filterData: any) => void;
};

function BaseTable<T>({
  config,
  handlePageChange,
  handleFilterChange,
}: Readonly<Props<T>>) {
  const [filterData, setFilterData] = useState({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const { isLoading, buttonOptions, actions, filters } = config;
  const { items, totalPages, pageNumber, pageSize, totalRecords } = config.data;
  const columnCount = config.headers.length + (actions ? 1 : 0);

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(items);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    setSortedData(
      sortData(items, { sortBy, reversed: reverseSortDirection, search })
    );
  }, [items, sortBy, reverseSortDirection, search]);

  const safeCompare = (a: any, b: any): number => {
    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    }

    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }

    return 0;
  };

  const onFilterChange = (newFilterData: any) => {
    if (Object.keys(newFilterData).length === 0) {
      setFilterData({});
      setSortedData(
        sortData(items, { sortBy, reversed: reverseSortDirection, search })
      );
      if (handleFilterChange) {
        handleFilterChange(newFilterData);
        close();
      }
      return;
    }
    const updatedFilterData = { ...filterData, ...newFilterData };
    setFilterData(updatedFilterData);

    if (handleFilterChange) {
      handleFilterChange(newFilterData);
      close();
    }
  };

  const setSorting = (field: keyof T) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(items, { sortBy: field, reversed, search }));
  };

  const searchData = (data: T[], search: string): T[] => {
    const query = search.toLowerCase().trim();
    return data.filter((item: any) =>
      Object.keys(item).some((key) => {
        const value = item[key as keyof T];
        return typeof value === "string" && value.toLowerCase().includes(query);
      })
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(items, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const sortData = (
    data: T[] | undefined,
    payload: { sortBy: keyof T | null; reversed: boolean; search: string }
  ): T[] => {
    if (!data) return [];

    const { sortBy, reversed, search } = payload;

    if (!sortBy) {
      return searchData(data, search);
    }

    const sorted = [...data].sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      const comparison = safeCompare(valA, valB);
      return reversed ? -comparison : comparison;
    });

    return searchData(sorted, search);
  };

  const renderAdditionalButton = (
    buttonOption: ButtonOptions,
    index: number
  ) => {
    return (
      buttonOption.show && (
        <Button
          key={"Action" + index}
          rightSection={buttonOption.icon}
          onClick={buttonOption.handler}
        >
          {buttonOption.text}
        </Button>
      )
    );
  };

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <Table.Tr>
          <Table.Td colSpan={columnCount} align="center" p={"50px"}>
            <Loader color="white" size="xl" type="dots" />
          </Table.Td>
        </Table.Tr>
      );
    }

    if (sortedData.length === 0) {
      return (
        <Table.Tr>
          <Table.Td colSpan={columnCount} align="center" p={"50px"}>
            <IconDatabaseOff size={48} />
            <div>No records found</div>{" "}
          </Table.Td>
        </Table.Tr>
      );
    }

    return sortedData.map((item, index) => (
      <Table.Tr key={String((item as any)["id"])}>
        {config.headers.map((header) => {
          if (header.hidden?.(item)) return null;
          let cellContent: any;
          if (header.renderComponent) {
            cellContent = header.renderComponent(item);
          } else if (header.format) {
            cellContent = header.format(item);
          } else {
            cellContent = item[header.key];
          }

          return <Table.Td key={String(header.key)}>{cellContent}</Table.Td>;
        })}
        {actions.length > 0 && (
          <Table.Td>
            <Menu
              opened={openMenuId === index}
              onChange={() =>
                setOpenMenuId(openMenuId === index ? null : index)
              }
            >
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  aria-label="Toggle color scheme"
                >
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {actions.map((action, index) => (
                  <Tooltip
                    label={action.toolTip ? action.toolTip : ""}
                    key={"Action" + index}
                  >
                    <Menu.Item
                      onClick={() => action.handler(item)}
                      color={action.color ? action.color : "gray"}
                      leftSection={action.icon}
                    >
                      <Text size="xs">{action.text}</Text>
                    </Menu.Item>
                  </Tooltip>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Table.Td>
        )}
      </Table.Tr>
    ));
  };

  const renderMenuItem = (buttonOption: ButtonOptions, index: number) => {
    return (
      buttonOption.show && (
        <Menu.Item key={"export" + index} rightSection={buttonOption.icon}>
          <Text size="xs" tt="uppercase" fw={700} c="dimmed">
            {buttonOption.text}
          </Text>
        </Menu.Item>
      )
    );
  };

  return (
    <ScrollArea>
      <Text size="xl">{config.titleTable}</Text>
      <Group justify="space-between" mt={16} mb={16}>
        <Box w={"100%"} maw={"300px"}>
          <TextInput
            w={"100%"}
            maw={"300px"}
            placeholder="Search by any field"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            value={search}
            onChange={handleSearchChange}
          />
        </Box>
        <Flex gap={"md"}>
          {buttonOptions.filter((x) => x.type === "action").length > 0 &&
            buttonOptions
              .filter((x) => x.type === "action")
              .map(renderAdditionalButton)}

          <ExportTableMenuButton
            buttonExportOptions={buttonOptions.filter(
              (x) => x.type === "export"
            )}
            renderMenuItem={renderMenuItem}
          />
          {filters.length > 0 && (
            <Button rightSection={<IconFilter />} onClick={open}>
              Filter
            </Button>
          )}
        </Flex>
      </Group>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {config.headers.map(
              (header) =>
                !header.hidden && (
                  <Th
                    sorted={sortBy === header.key}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting(header.key)}
                    key={String(header.key)}
                  >
                    {header.name}
                  </Th>
                )
            )}
            {actions && actions.length > 0 && <Table.Th></Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderTableContent()}</Table.Tbody>
      </Table>
      <PaginationTable
        pageSize={pageSize!}
        currentPage={pageNumber!}
        totalPages={totalPages!}
        totalItems={totalRecords!}
        onChange={handlePageChange}
      />
      {filters.length > 0 && (
        <Modal
          opened={opened}
          onClose={close}
          size={"lg"}
          title="Filters"
          centered
        >
          <GenericFilterModal
            filters={filters}
            initialValues={filterData}
            onFilterChange={onFilterChange}
          />
        </Modal>
      )}
    </ScrollArea>
  );
}

export default BaseTable;
