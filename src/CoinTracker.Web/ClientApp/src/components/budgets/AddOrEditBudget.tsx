import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  TextInput,
  Box,
  Button,
  Group,
  Grid,
  NumberInput,
  Select,
} from "@mantine/core";
import {
  Currency,
  LimitPeriod,
  generateCurrencyOptions,
} from "../../common/enums";
import { Budget } from "../../models";
import { IconCheck, IconCoin, IconX } from "@tabler/icons-react";
import { z } from "zod";
import { getErrorValidationMessage, zodResolver } from "../../common/utils/validation.zod";
import budgetService from "../../services/budgets/budget.service";
import { notifications } from "@mantine/notifications";
import { formatValueSelectToEnum } from "../../common/utils/enum.utils";
import { useUserStore } from "../../store/session/session";

const budgetSchema = z.object({
  name: z.string().min(1, { message: "Budget Name is required" }),
  fullAmount: z.number().min(1, { message: "Must be greater than 0" }),
  limit: z.number(),
  currency: z.nativeEnum(Currency),
  limitPeriod: z.nativeEnum(LimitPeriod),
}).refine((data) => data.fullAmount >= data.limit, {
  path: ["fullAmount"],
  message: "Full amount must be at least as much as the limit",
});

interface AddOrEditBudgetProps {
  onBudgetCreated: () => void;
  budgetToEdit?: Budget;
}

const AddOrEditBudget: React.FC<AddOrEditBudgetProps> = ({ onBudgetCreated, budgetToEdit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const zodValidateBudget = zodResolver<Budget>(budgetSchema);
  const { firebaseUser } = useUserStore();

  const handleSubmit = async (values: Budget) => {
    try {
      let response: Budget | undefined = undefined;

      notifications.show({
        id: "create-update-budget",
        message: `${budgetToEdit ? "Updating" : "Creating"} Budget...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });
      values.firebaseId = firebaseUser?.uid;

      setIsLoading(true);

      if(budgetToEdit) {
        response = await budgetService.update(`/${values.id!}`, { userId: values.userId!, budget: values});
      } else {
        response = await budgetService.create(values);
      }

      setIsLoading(false);
      notifications.update({
        id: "create-update-budget",
        message: `Budget "${response.name}" ${budgetToEdit ? "updated" : "created"} successfully!`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
      onBudgetCreated();
    } catch (error) {
      setIsLoading(false);
      notifications.update({
        id: "create-update-budget",
        message: `An error has occurred ${budgetToEdit ? "updating" : "creating"} the budget`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });

      console.error("Failed to submit budget:", error);
    }
  };

  const defaultValues: Budget = {
    currency: Currency.DOP,
    fullAmount: 0,
    limit: 0,
    limitPeriod: LimitPeriod.Monthly,
    name: "",
  };

  return (
    <Box>
      <Formik
        initialValues={budgetToEdit || defaultValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
        validate={zodValidateBudget}
        >
          {({ handleSubmit, errors, touched, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <Grid grow>
              <Grid.Col span={6}>
                <Field
                  name="name"
                  as={TextInput}
                  label="Budget Name"
                  placeholder="Budget Name"
                  error={touched.name && errors.name}
                  withAsterisk
                />
              </Grid.Col>
            </Grid>
            <Grid mt={10} grow>
              <Grid.Col span={6}>
                <Field name="fullAmount">
                  {({ field, form }: any) => {
                    return (
                      <NumberInput
                        {...field}
                        label="Full Amount"
                        placeholder="Full Amount"
                        prefix="$"
                        error={
                          form.touched.fullAmount && form.errors.fullAmount
                            ? getErrorValidationMessage(form.errors.fullAmount)
                            : undefined
                        }
                        onChange={(value) =>{
                          form.setFieldValue("fullAmount", value)
                        }
                        }
                        rightSection={<IconCoin />}
                        withAsterisk
                        hideControls
                      />
                    );
                  }}
                </Field>
              </Grid.Col>
              <Grid.Col span={6}>
                <Field name="limit">
                  {({ field, form }: any) => {
                    return (
                      <NumberInput
                        {...field}
                        label="Limit Amount"
                        placeholder="Limit Amount"
                        prefix="$"
                        error={
                          form.touched.limit && form.errors.limit
                            ? form.errors.limit
                            : undefined
                        }
                        onChange={(value) => form.setFieldValue("limit", value)}
                        rightSection={<IconCoin />}
                        hideControls
                      />
                    );
                  }}
                </Field>
              </Grid.Col>
            </Grid>
            <Grid mt={10} grow>
              <Grid.Col span={6}>
                <Field name="currency">
                  {({ field, form }: any) => {
                    return (
                      <Select
                        {...field}
                        data={generateCurrencyOptions()}
                        label="Currency"
                        placeholder="Select Currency"
                        error={
                          form.touched.currency && form.errors.currency
                            ? form.errors.currency
                            : undefined
                        }
                        onChange={(value) => {
                          form.setFieldValue(
                            "currency",
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
            <Group mt="xl" justify="flex-end">
              <Button disabled={!isValid} loading={isLoading} type="submit">
                {budgetToEdit ? "Edit" : "Create"}
              </Button>
            </Group>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddOrEditBudget;
