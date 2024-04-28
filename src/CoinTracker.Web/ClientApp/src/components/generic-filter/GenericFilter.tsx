import React from "react";
import { Formik, Field, FormikProps } from "formik";
import {
  TextInput,
  NumberInput,
  Select,
  Box,
  Button,
  Group,
  Grid,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  OptionsSelectFilter,
  TableHeaderFilter,
} from "../../common/types/tableConfig";
import { IconCalendar, IconFilterOff } from "@tabler/icons-react";

interface GenericFilterProps {
  filters: TableHeaderFilter[];
  initialValues: { [key: string]: any };
  onFilterChange: (data: { [key: string]: any }) => void;
}

const GenericFilter: React.FC<GenericFilterProps> = ({
  filters,
  initialValues,
  onFilterChange,
}) => {
  const handleInputChange =
    (
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
      ) => void
    ) =>
    (name: string, value: any) => {
      setFieldValue(name, value, false);
    };

  const removeFilters = () => {
    onFilterChange({});
  };

  const renderInputField = (
    filter: TableHeaderFilter,
    setFieldValue: FormikProps<{ "[key: string]": any }>["setFieldValue"],
    value: any
  ) => {
    const fieldProps = {
      name: filter.name,
      onChange: (value: any) =>
        handleInputChange(setFieldValue)(
          filter.name,
          !value ? filter.startValue : value
        ),
    };

    switch (filter.type) {
      case "text":
        return (
          <TextInput
            label={filter.labelName}
            name={filter.name}
            onChange={(event) => {
              setFieldValue(filter.name, event.currentTarget.value);
            }}
            value={!value ? filter.startValue : value}
            placeholder={filter.labelName}
          />
        );
      case "date":
        return (
          <DateInput
            label={filter.labelName}
            {...fieldProps}
            placeholder={filter.labelName}
            value={value}
            rightSection={<IconCalendar />}
          />
        );
      case "range-date":
        return (
          <>
            <DateInput
              label={filter.labelName}
              {...fieldProps}
              placeholder={filter.labelName}
              value={value}
              rightSection={<IconCalendar />}
            />
            <DateInput
              label={filter.labelName}
              {...fieldProps}
              placeholder={filter.labelName}
              value={value}
              rightSection={<IconCalendar />}
            />
          </>
        );
      case "number":
        return (
          <NumberInput
            label={filter.labelName}
            {...fieldProps}
            placeholder={filter.labelName}
            value={value}
          />
        );
      case "select":
        return (
          <Select
            label={filter.labelName}
            {...fieldProps}
            data={filter.options?.map((option: OptionsSelectFilter) => ({
              value: option.value,
              label: option.label,
            }))}
            defaultValue={value}
            placeholder={filter.labelName}
            clearable
            allowDeselect
            searchable
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onFilterChange(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Grid grow>
              {filters.map((filter) => (
                <Grid.Col key={filter.key} span={6}>
                  <Field name={filter.name}>
                    {({ field }: any) =>
                      renderInputField(filter, setFieldValue, field.value)
                    }
                  </Field>
                </Grid.Col>
              ))}
            </Grid>
            <Group mt={"lg"} justify="flex-end">
              {Object.keys(initialValues).length > 0 && (
                <Button color="gray" onClick={removeFilters} rightSection={<IconFilterOff />}>Remove Filters</Button>
              )}
              <Button type="submit">Filter</Button>
            </Group>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default GenericFilter;
