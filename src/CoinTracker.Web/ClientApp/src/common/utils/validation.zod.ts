import { z, ZodSchema } from "zod";

// Generic validation function that works with any Zod schema
export const zodResolver = <T>(schema: ZodSchema<T>) => {
  return (values: T) => {
    try {
      schema.parse(values);
      return {}; // Return an empty object if validation is successful
    } catch (error) {
        if (error instanceof z.ZodError) {
        return error.flatten().fieldErrors || {}; // Convert Zod errors to a format Formik can use
      }
      return {}; // Fallback if the error is not from Zod
    }
  };
};

export const getErrorValidationMessage = (errorInputForm: any[]) => {
  // Check if the array length is greater than one
  if (errorInputForm.length > 1) {
    return errorInputForm[0]; // Return only the first element
  }
  return errorInputForm; // Return the array as is if it has one or no elements
}
