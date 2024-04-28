import {
  Accordion,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  NumberInput,
  Radio,
  Select,
  Switch,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import {
  IconCalendar,
  IconCheck,
  IconCoin,
  IconInfoCircle,
  IconSettings,
  IconX,
} from "@tabler/icons-react";
import { Field, Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import {
  Currency,
  ExpenseCategories,
  TransactionType,
  generateExpenseCategoriesOptions,
} from "../../common/enums";
import {
  RecurrenceFrequency,
  generateRecurrenceFrequencyOptions,
} from "../../common/enums/recurrence.frequency.enum";
import { formatValueSelectToEnum } from "../../common/utils/enum.utils";
import {
  getErrorValidationMessage,
  zodResolver,
} from "../../common/utils/validation.zod";
import { Budget } from "../../models";
import { BudgetTransaction } from "../../models/transactions/budgetTransaction.model";
import budgetService from "../../services/budgets/budget.service";
import transactionService from "../../services/transactions/transaction.service";
import { useUserStore } from "../../store/session/session";

const recurringTransactionSchema = z.object({
  frequency: z.nativeEnum(RecurrenceFrequency),
  interval: z.number().min(1, { message: "Interval must be at least 1" }),
  nextOccurrence: z.date(),
  isActive: z.boolean(),
});

const transactionSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Transaction description is required" }),
  amount: z.number().min(1, { message: "Must be greater than 0" }),
  date: z.date(),
  category: z.nativeEnum(ExpenseCategories),
  recurringTransaction: recurringTransactionSchema.optional(),
});

interface AddOrEditTransactionProps {
  onTransactionModified: () => void;
  transactionToEdit?: BudgetTransaction;
  budget?: Budget;
}

const AddOrEditTransaction: React.FC<AddOrEditTransactionProps> = ({
  onTransactionModified,
  transactionToEdit,
  budget,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const zodValidateBudget = zodResolver<BudgetTransaction>(transactionSchema);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budgetOptions, setBudgetOptions] = useState<any[]>([]);
  const [isRecurrentTransaction, setIsRecurrentTransaction] =
    useState<boolean>(false);
  const { firebaseUser } = useUserStore();

  const getAllBudgets = useCallback(async () => {
    if (!firebaseUser?.uid || budgets.length > 0) return;

    try {
      const response = await budgetService.getAllWithPagination(
        `/${firebaseUser?.uid}`,
        0,
        0
      );
      setBudgets(response.items);

      setBudgetOptions(
        response.items.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
    } catch (error) {
      console.log("Failed to fetch budgets:", error);
    }
  }, [firebaseUser?.uid, budgets.length]);

  // useEffect to call getAllBudgets initially or on uid change
  useEffect(() => {
    if (transactionToEdit) {
      setIsRecurrentTransaction(
        transactionToEdit.type === TransactionType.Recurrent
      );
      transactionToEdit.recurringTransaction = {
        frequency: RecurrenceFrequency.Daily,
        interval: 1,
        nextOccurrence: new Date(),
        isActive: true,
      };
    }

    if (!budget) {
      getAllBudgets();
    }
  }, [getAllBudgets]);

  const handleSubmit = async (values: BudgetTransaction) => {
    try {
      if (!isRecurrentTransaction) {
        values.recurringTransaction = undefined;
      }

      if (budget) {
        values.budgetId = budget.id;
        values.userId = budget.userId;
      } else {
        values.userId = budgets.find((b) => b.id === values.budgetId)?.userId;
      }

      let response: BudgetTransaction | undefined = undefined;

      notifications.show({
        id: "create-update-transaction",
        message: `${
          transactionToEdit ? "Updating" : "Creating"
        } Transaction...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      setIsLoading(true);

      if (transactionToEdit) {
        response = await transactionService.update(`/${transactionToEdit.id}`, {
          userId: values.userId!,
          transaction: values,
        });
      } else {
        response = await transactionService.create(values);
      }

      setIsLoading(false);
      notifications.update({
        id: "create-update-transaction",
        message: `Transaction "${response.description}" ${
          transactionToEdit ? "updated" : "created"
        } successfully!`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
      onTransactionModified();
    } catch (error) {
      setIsLoading(false);
      notifications.update({
        id: "create-update-transaction",
        message: `An error has occurred ${
          transactionToEdit ? "updating" : "creating"
        } the transaction`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });

      console.error("Failed to submit transaction:", error);
    }
  };

  const defaultValues: BudgetTransaction = {
    category: ExpenseCategories.Groceries,
    amount: 0,
    description: "",
    date: new Date(),
    recurringTransaction: {
      frequency: RecurrenceFrequency.Daily,
      interval: 1,
      nextOccurrence: new Date(),
      isActive: true,
    },
  };

  return (
    <Box>
      <Formik
        initialValues={transactionToEdit || defaultValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
        validate={zodValidateBudget}
      >
        {({ handleSubmit, errors, touched, isValid }) => (
          <Form onSubmit={handleSubmit}>
            {!budget && (
              <Grid grow>
                <Grid.Col span={12}>
                  <Field name="budgetId">
                    {({ field, form }: any) => {
                      return (
                        <Select
                          {...field}
                          data={budgetOptions}
                          label="Budget"
                          placeholder="Select Budget"
                          error={
                            form.touched.budgetId && form.errors.budgetId
                              ? form.errors.budgetId
                              : undefined
                          }
                          onChange={(value) => {
                            form.setFieldValue("budgetId", value);
                          }}
                          value={String(field.value)}
                          clearable
                          allowDeselect
                          searchable
                          withAsterisk
                        />
                      );
                    }}
                  </Field>
                </Grid.Col>
              </Grid>
            )}
            <Grid mt={10} grow>
              <Grid.Col span={6}>
                <Field
                  name="description"
                  as={TextInput}
                  label="Transaction Description"
                  placeholder="Transaction Description"
                  error={touched.description && errors.description}
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Field name="amount">
                  {({ field, form }: any) => {
                    return (
                      <NumberInput
                        {...field}
                        label="Amount"
                        placeholder="Amount"
                        prefix="$"
                        error={
                          form.touched.amount && form.errors.amount
                            ? getErrorValidationMessage(form.errors.amount)
                            : undefined
                        }
                        onChange={(value) => {
                          form.setFieldValue("amount", value);
                        }}
                        rightSection={<IconCoin />}
                        withAsterisk
                        hideControls
                      />
                    );
                  }}
                </Field>
              </Grid.Col>
            </Grid>
            <Grid mt={10} grow>
              <Grid.Col span={6}>
                <Field name="date">
                  {({ field, form }: any) => {
                    return (
                      <DateInput
                        {...field}
                        valueFormat="DD MMM YYYY"
                        label="Transaction Date"
                        placeholder="Transaction Date"
                        error={
                          form.touched.date && form.errors.date
                            ? getErrorValidationMessage(form.errors.date)
                            : undefined
                        }
                        onChange={(value) => {
                          form.setFieldValue("date", value);
                        }}
                        rightSection={<IconCalendar />}
                      />
                    );
                  }}
                </Field>
              </Grid.Col>
              <Grid.Col span={6}>
                <Field name="category">
                  {({ field, form }: any) => {
                    return (
                      <Select
                        {...field}
                        data={generateExpenseCategoriesOptions()}
                        label="Category"
                        placeholder="Select Category"
                        error={
                          form.touched.category && form.errors.category
                            ? form.errors.category
                            : undefined
                        }
                        onChange={(value) => {
                          form.setFieldValue(
                            "category",
                            formatValueSelectToEnum(value!, Currency)
                          );
                        }}
                        value={String(field.value)}
                        clearable
                        allowDeselect
                        searchable
                        withAsterisk
                      />
                    );
                  }}
                </Field>
              </Grid.Col>
            </Grid>
            {isRecurrentTransaction && (
              <>
                <Divider mt="xl" />
                <Group>
                  <Title mt={"10"} size={"20"} order={2}>
                    Recurrent Transaction
                  </Title>
                  <Tooltip label="A recurrent transaction is a transaction that will occurs every set amount of time.">
                    <IconInfoCircle
                      style={{
                        width: "3%",
                        height: "3%",
                        marginTop: "0.8rem",
                        marginLeft: "-0.5rem",
                      }}
                      stroke={1.5}
                    />
                  </Tooltip>
                </Group>
                <Grid mt={10} grow>
                  <Grid.Col span={6}>
                    <Field name="recurringTransaction.frequency">
                      {({ field, form }: any) => {
                        const frequencyError =
                          form.touched.recurringTransaction?.frequency &&
                          form.errors.recurringTransaction?.frequency
                            ? form.errors.recurringTransaction.frequency
                            : undefined;
                        return (
                          <Select
                            {...field}
                            data={generateRecurrenceFrequencyOptions()}
                            label="Frecuency"
                            placeholder="Select Frecuency"
                            error={frequencyError}
                            onChange={(value) => {
                              form.setFieldValue(
                                "recurringTransaction.frequency",
                                formatValueSelectToEnum(
                                  value!,
                                  RecurrenceFrequency
                                )
                              );
                            }}
                            value={String(field.value)}
                            clearable
                            allowDeselect
                            searchable
                            withAsterisk
                          />
                        );
                      }}
                    </Field>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Field name="recurringTransaction.nextOccurrence">
                      {({ field, form }: any) => {
                        return (
                          <DateInput
                            {...field}
                            valueFormat="DD MMM YYYY"
                            label="Start Date"
                            placeholder="Start Date"
                            error={
                              form.touched.recurringTransaction
                                ?.nextOccurrence &&
                              form.errors.recurringTransaction?.nextOccurrence
                                ? getErrorValidationMessage(
                                    form.errors.recurringTransaction
                                      ?.nextOccurrence
                                  )
                                : undefined
                            }
                            onChange={(value) => {
                              form.setFieldValue(
                                "recurringTransaction.nextOccurrence",
                                value
                              );
                            }}
                            rightSection={<IconCalendar />}
                          />
                        );
                      }}
                    </Field>
                  </Grid.Col>
                </Grid>
                <Accordion mt={20} variant="separated" defaultValue="Apples">
                  <Accordion.Item value={"Advanced Settings"}>
                    <Accordion.Control icon={<IconSettings />}>
                      <Group>
                        Advanced Settings
                        <Tooltip
                          multiline
                          w={220}
                          withArrow
                          transitionProps={{ duration: 200 }}
                          label="In advance settings you can edit the interval that this transaction will occurs. Example: An interval of 2 will add 2 to the current transaction date based on the frequency."
                        >
                          <IconInfoCircle
                            style={{
                              width: "3%",
                              height: "3%",
                              marginLeft: "-0.5rem",
                            }}
                            stroke={1.5}
                          />
                        </Tooltip>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Grid mt={10} grow>
                        <Grid.Col span={6}>
                          <Field name="recurringTransaction.interval">
                            {({ field, form }: any) => {
                              const intervalError =
                                form.touched.recurringTransaction?.interval &&
                                form.errors.recurringTransaction?.interval
                                  ? form.errors.recurringTransaction.interval
                                  : undefined;
                              return (
                                <NumberInput
                                  {...field}
                                  label="Interval"
                                  placeholder="Interval"
                                  error={intervalError}
                                  onChange={(value) => {
                                    form.setFieldValue(
                                      "recurringTransaction.interval",
                                      value
                                    );
                                  }}
                                  withAsterisk
                                  hideControls
                                />
                              );
                            }}
                          </Field>
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Field name="recurringTransaction.isActive">
                            {({ field, form }: any) => {
                              return (
                                <Radio.Group
                                  {...field}
                                  label="Select if Active or Inactive"
                                  withAsterisk
                                  value={field.value ? "true" : "false"}
                                  onChange={(value) => {
                                    form.setFieldValue(
                                      "recurringTransaction.isActive",
                                      value === "true"
                                    );
                                  }}
                                >
                                  <Group mt="xs">
                                    <Radio value="true" label="Active" />
                                    <Radio value="false" label="Inactive" />
                                  </Group>
                                </Radio.Group>
                              );
                            }}
                          </Field>
                        </Grid.Col>
                      </Grid>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </>
            )}
            <Group mt="xl" justify="space-between">
              <Group wrap="nowrap" gap="20">
                <div>
                  <Text>¿Is this a recurrent transaction?</Text>
                </div>
                <Switch
                  checked={isRecurrentTransaction}
                  onChange={(value) => {
                    setIsRecurrentTransaction(value.target.checked);
                  }}
                  size="md"
                />
              </Group>
              <Button disabled={!isValid} loading={isLoading} type="submit">
                {transactionToEdit ? "Edit" : "Create"}
              </Button>
            </Group>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddOrEditTransaction;
