import { Badge, Modal, Text, rem } from "@mantine/core";
import { useState } from "react";
import { Budget } from "../../models";
import { TableConfig, TableHeaderFilter } from "../../common/types/tableConfig";
import useBudgetsPaginated from "../../hooks/budgets/useBudgetsPaginated.hook";
import {
  IconCash,
  IconCheck,
  IconCoins,
  IconEdit,
  IconListDetails,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { formatCurrency } from "../../common/utils/currencyAmount.utils";
import {
  getCurrencyName,
  getLimitPeriodName,
} from "../../common/utils/enum.utils";
import { formatDate } from "../../common/utils/date.utils";
import { generateCurrencyOptions } from "../../common/enums";
import { useDisclosure } from "@mantine/hooks";
import { useUserStore } from "../../store/session/session";
import { modals } from "@mantine/modals";
import budgetService from "../../services/budgets/budget.service";
import { notifications } from "@mantine/notifications";
import { AddOrEditBudget, BaseTable } from "../../components";
import { useNavigate } from "react-router-dom";
import AddOrEditTransaction from "../../components/transactions/AddOrEditTransaction";

export const Budgets = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedTransactionModal, { open: openTransactionModal, close: closeTransactionModal }] = useDisclosure(false);
  const [filters, setFilters] = useState({});
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | undefined>(
    undefined
  );
  const { firebaseUser } = useUserStore();
  const [pageSettings, setPageSettings] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const { data, refetch, isLoading } = useBudgetsPaginated(
    firebaseUser?.uid!,
    pageSettings.currentPage,
    pageSettings.pageSize,
    filters
  );
  const navigate = useNavigate();

  const handlerCreating = () => {
    close();
    refetch();
  };

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPageSettings({ currentPage: newPage, pageSize: newPageSize });
  };

  const handleFilterApply = (filterObject: any) => {
    setFilters(filterObject);
  };

  const deleteBudget = async (budget: Budget) => {
    try {
      notifications.show({
        id: "delete-budget",
        message: `Deleting Budget...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      await budgetService.delete(budget.id!, `/User/${budget.userId!}`);
      refetch();

      notifications.update({
        id: "delete-budget",
        message: `Budget deleted successfully!`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
    } catch (error) {
      notifications.update({
        id: "delete-budget",
        message: `An error has occurred deleting the budget`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });
      console.error("Failed to delete budget:", error);
    }
  };

  const openModalConfirmOnDeleteBudget = async (budget: Budget) => {
    modals.openConfirmModal({
      title: "Are you sure you want to delete this budget?",
      confirmProps: { color: "red" },
      children: (
        <Text size="sm">
          This action is irreversible, you will not be able to recover this
          budget.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        deleteBudget(budget);
      },
    });
  };

  const filtersConfig: TableHeaderFilter[] = [
    {
      key: 1,
      name: "currency",
      labelName: "Currency",
      type: "select",
      options: generateCurrencyOptions(),
      startValue: "0",
    },
  ];

  const tableConfig: TableConfig<Budget> = {
    titleTable: "Budgets",
    data: {
      items: data?.items as Budget[],
      totalRecords: data?.totalRecords,
      pageNumber: data?.pageNumber,
      pageSize: data?.pageSize,
      totalPages: data?.totalPages,
    },
    isLoading,
    filters: filtersConfig,
    headers: [
      {
        key: "name",
        name: "Name",
      },
      {
        key: "fullAmount",
        name: "Full Amount",
        format: (rowData: Budget) => {
          return formatCurrency(rowData.fullAmount, rowData.currency);
        },
      },
      {
        key: "limit",
        name: "Limit Amount",
        format: (rowData: Budget) => {
          return formatCurrency(rowData.limit, rowData.currency);
        },
      },
      {
        key: "currency",
        name: "Currency",
        renderComponent: (rowData: Budget) => {
          return (
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              {getCurrencyName(rowData.currency)}
            </Badge>
          );
        },
      },
      {
        key: "limitPeriod",
        name: "Limit Period",
        renderComponent: (rowData: Budget) => {
          return (
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: "teal", to: "green", deg: 90 }}
            >
              {getLimitPeriodName(rowData.limitPeriod)}
            </Badge>
          );
        },
      },
      {
        key: "createdDate",
        name: "Created Date",
        renderComponent: (rowData: Budget) => {
          return (
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: "lime", to: "green", deg: 90 }}
            >
              {formatDate(rowData.createdDate!, "dd/MM/yyyy")}
            </Badge>
          );
        },
      },
    ],
    buttonOptions: [
      {
        show: true,
        type: "action",
        icon: <IconCoins />,
        text: "Add Budget",
        handler: () => {
          setBudgetToEdit(undefined);
          open();
        },
      },
    ],
    actions: [
      {
        icon: <IconCash style={{ width: rem(14), height: rem(14) }} />,
        toolTip: "Add Transaction",
        text: "Add Transaction",
        color: "#4CAF50",
        handler: (rowData: Budget) => {
          setBudgetToEdit(rowData);
          openTransactionModal();
        },
      },
      {
        icon: <IconListDetails style={{ width: rem(14), height: rem(14) }} />,
        toolTip: "See Details",
        text: "Details",
        handler: (rowData: Budget) => {
          navigate(`/budgets/${rowData.id}`);
        },
      },
      {
        icon: <IconEdit style={{ width: rem(14), height: rem(14) }} color="#1565C0" />,
        toolTip: "Edit",
        text: "Edit",
        color: "#1565C0",
        handler: (budget: Budget) => {
          setBudgetToEdit(budget);
          open();
        },
      },
      {
        icon: <IconTrash style={{ width: rem(14), height: rem(14) }} color={"#F44336"} />,
        toolTip: "Delete",
        text: "Delete",
        color: "red",
        handler: (budget: Budget) => {
          openModalConfirmOnDeleteBudget(budget);
        },
      },
    ],
  };
  return (
    <div className="my-container">
      <BaseTable
        config={tableConfig}
        handlePageChange={handlePageChange}
        handleFilterChange={(dataFilter) => {
          handleFilterApply(dataFilter);
        }}
      />
      <Modal
        opened={opened}
        onClose={close}
        size={"lg"}
        title={budgetToEdit ? "Edit Budget" : "Add Budget"}
        centered
      >
        <AddOrEditBudget
          budgetToEdit={budgetToEdit}
          onBudgetCreated={() => {
            handlerCreating();
          }}
        />
      </Modal>
      <Modal
        opened={openedTransactionModal}
        onClose={closeTransactionModal}
        size={"xl"}
        title={"Add Transaction"}
        centered
      >
        <AddOrEditTransaction
          budget={budgetToEdit}
          onTransactionModified={() => {
            closeTransactionModal();
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};

export default Budgets;
