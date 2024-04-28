import { Badge, Modal, Text, rem } from "@mantine/core";
import {
  PagedResponse,
  TableConfig,
  TableHeaderFilter,
} from "../../../common/types/tableConfig";
import { formatDate } from "../../../common/utils/date.utils";
import {
  getExpenseCategoryName,
  getTransactionTypeName,
} from "../../../common/utils/enum.utils";
import { BudgetTransaction } from "../../../models/transactions/budgetTransaction.model";
import { BaseTable } from "../..";
import { useDisclosure } from "@mantine/hooks";
import AddOrEditTransaction from "../../transactions/AddOrEditTransaction";
import { useState } from "react";
import { modals } from "@mantine/modals";
import { IconCash, IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import transactionService from "../../../services/transactions/transaction.service";
import { Budget } from "../../../models";
import { generateExpenseCategoriesOptions, generateTransactionTypeOptions } from "../../../common/enums";
interface DashboardTableProps {
  isLoading: boolean;
  data?: PagedResponse<BudgetTransaction>;
  budget?: Budget;
  showButtonAddTransaction?: boolean;
  onTransactionModified?: () => void;
  onFilterChange?: (filters: any) => void;
}
export function TransactionTable({
  data,
  isLoading,
  onTransactionModified,
  onFilterChange,
  budget,
  showButtonAddTransaction, 
}: Readonly<DashboardTableProps>) {
  const [openedTransactionModal, { open: openTransactionModal, close: closeTransactionModal }] = useDisclosure(false);
  const [transaction, setTransaction] = useState<BudgetTransaction | undefined>(
    undefined
  );

  const handleFilterApply = (filterObject: any) => {
    onFilterChange && onFilterChange(filterObject);
  };

  const deleteTransaction = async (transaction: BudgetTransaction) => {
    try {
      notifications.show({
        id: "delete-transaction",
        message: `Deleting Transaction...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      await transactionService.delete(transaction.id!);
      if (onTransactionModified) {
        onTransactionModified();
      }

      notifications.update({
        id: "delete-transaction",
        message: `Transaction deleted successfully!`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
    } catch (error) {
      notifications.update({
        id: "delete-transaction",
        message: `An error has occurred deleting the transaction`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });
      console.error("Failed to delete transaction:", error);
    }
  };

  const openModalConfirmOnDeleteTransaction = async (transaction: BudgetTransaction) => {
    modals.openConfirmModal({
      title: "Are you sure you want to delete this transaction?",
      confirmProps: { color: "red" },
      children: (
        <Text size="sm">
          This action is irreversible, you will not be able to recover this
          transaction.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        deleteTransaction(transaction);
      },
    });
  };
  
  const filtersConfig: TableHeaderFilter[] = [
    {
      key: 1,
      name: "type",
      labelName: "Transaction Type",
      type: "select",
      options: generateTransactionTypeOptions(),
      startValue: "0",
    },
    {
      key: 2,
      name: "category",
      labelName: "Category",
      type: "select",
      options: generateExpenseCategoriesOptions(),
      startValue: "0",
    },
  ];

  const tableConfig: TableConfig<BudgetTransaction> = {
    titleTable: "Latest Transactions",
    data: data || { items: [], totalPages: 0, pageNumber: 0, pageSize: 0, totalRecords: 0},
    filters: onFilterChange ? filtersConfig : [],
    buttonOptions: [
      {
        show: !!showButtonAddTransaction,
        type: "action",
        icon: <IconCash />,
        text: "Add Transaction",
        handler: () => {
          setTransaction(undefined);
          openTransactionModal();
        },
      },
    ],
    actions: [
      {
        icon: <IconEdit style={{ width: rem(14), height: rem(14) }} color="#1565C0" />,
        toolTip: "Edit",
        text: "Edit",
        color: "#1565C0",
        handler: (transaction: BudgetTransaction) => {
          transaction.date = new Date(transaction.date); //Make sure the date is a Date object when editing it
          if (transaction.recurringTransaction) {
            transaction.recurringTransaction.nextOccurrence = new Date(transaction.recurringTransaction.nextOccurrence); //Make sure the date is a Date object when editing it
          }
          setTransaction(transaction);
          openTransactionModal();
        },
      },
      {
        icon: <IconTrash style={{ width: rem(14), height: rem(14) }} color={"#F44336"} />,
        toolTip: "Delete",
        text: "Delete",
        color: "red",
        handler: (transaction: BudgetTransaction) => {
          openModalConfirmOnDeleteTransaction(transaction);
        },
      },
    ],
    isLoading,
    headers: [
      {
        key: "description",
        name: "Description",
      },
      {
        key: "type",
        name: "Type",
        renderComponent: (rowData: BudgetTransaction) => {
          return (
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              {getTransactionTypeName(rowData.type!)}
            </Badge>
          );
        },
      },
      {
        key: "amount",
        name: "Amount",
      },
      {
        key: "category",
        name: "Category",
        renderComponent: (rowData: BudgetTransaction) => {
          return (
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: "teal", to: "green", deg: 90 }}
            >
              {getExpenseCategoryName(rowData.category)}
            </Badge>
          );
        },
      },
      {
        key: "date",
        name: "Created At",
        renderComponent: (rowData: BudgetTransaction) => {
          return (
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: "lime", to: "green", deg: 90 }}
            >
              {formatDate(rowData.date, "dd/MM/yyyy")}
            </Badge>
          );
        },
      },
    ],
  };
  const handlePageChange = () => {
    return;
  };
  return (
    <>
      <BaseTable config={tableConfig} handlePageChange={handlePageChange} handleFilterChange={handleFilterApply} />
      <Modal
        opened={openedTransactionModal}
        onClose={closeTransactionModal}
        size={"xl"}
        title={"Add Transaction"}
        centered
      >
        <AddOrEditTransaction
          transactionToEdit={transaction}
          budget={budget}
          onTransactionModified={() => {
            closeTransactionModal();
            onTransactionModified && onTransactionModified();
          }}
        />
      </Modal>
    </>
  );
}
