import React from "react";
import { Group, Button, Select, Text } from "@mantine/core";
import { PagesToSelect } from "../../../common/constants/paginationSelect";

type PaginationProps = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  onChange: (page: number, pageToShow: number) => void;
};

const PaginationTable: React.FC<PaginationProps> = ({
  currentPage = 1,
  pageSize = 10,
  totalPages = 1,
  totalItems = 0,
  onChange,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);

  const createPageNumbers = () => {
    let pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
    let endPage = Math.min(totalPages, startPage + pageSize - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - pageSize + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Group justify="space-between" mt="md">
      <div>
        <Text
          size="sm"
          mr="md"
          component="span"
          style={{ verticalAlign: "middle" }}
        >
          Items per page:
        </Text>
        <Select
          size="xs"
          value={pageSize.toString()}
          style={{ display: "inline-block", width: "auto" }}
          onChange={(value) => onChange(1, Number(value))}
          data={PagesToSelect.map((page: number) => ({
            value: page.toString(),
            label: page.toString(),
          }))}
        />
      </div>

      <Text size="sm">
        {startItem}-{endItem} of {totalItems} items
      </Text>

      <Group>
        <Button
          variant="filled"
          size="xs"
          onClick={() => onChange(Math.max(1, currentPage - 1), pageSize)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {createPageNumbers().map((page) => (
          <Button
            size="xs"
            variant={currentPage === page ? "filled" : "outline"}
            key={page}
            onClick={() => onChange(page, pageSize)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="filled"
          size="xs"
          onClick={() =>
            onChange(Math.min(totalPages, currentPage + 1), pageSize)
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Group>
    </Group>
  );
};

export default PaginationTable;
