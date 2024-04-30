import { type DeepPartial, useForm as useFormRHF } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodType } from "zod";
import { useCallback } from "react";

/**
 * A typed version of react hook form that infer the value type from a zod schema
 *
 * ## Usage
 *
 * ```ts
 * const schema = z.object({
 *   civility: z.enum(["Female", "Male", "Undefined"]),
 *   lastName: z.string().min(10),
 *   firstName: z.string().min(10),
 * });
 *
 * const MyForm = ({contact}) => {
 *   const { register, control, errors, handleSubmit } = useForm(schema, {
 *     defaultValues: contact,
 *   });
 *
 *
 * }
 * ```
 */
export function useForm<V extends ZodType<any, any, any>>(
  schema: V,
  options?: {
    defaultValues?: DeepPartial<z.infer<V>>;
    mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
  },
) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
    setError,
    getValues,
    setValue,
    watch,
    clearErrors,
    reset,
  } = useFormRHF<z.infer<V>>({
    resolver: zodResolver(schema),
    ...options,
  });

  const setErrorFromAPI = useCallback(
    (errors: Record<string, string | string[]>) => {
      for (const [key, value] of Object.entries(errors)) {
        setError(key as any, {
          message: Array.isArray(value) ? value.join(", ") : value,
        });
      }
    },
    [setError],
  );

  return {
    watch,
    register,
    control,
    errors,
    getValues,
    reset,
    handleSubmit,
    setError,
    clearErrors,
    isSubmitting,
    isValid,
    setErrorFromAPI,
    setValue,
  };
}
