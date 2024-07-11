import { z } from "zod";
import { addressSchema } from "./addressSchema";

export const contactSchema = z.object({
  civility: z.enum(["Female", "Male", "Undefined"]),
  lastName: z.string().min(3),
  firstName: z.string().min(3),
  function: z.string().optional(),
  email: z.string().email(),
  phone: z
    .string()
    .nullable()
    .transform(val => (val === null ? "" : val))
    .optional(),
  secondPhone: z.string().optional().or(z.literal("")),
  identificationName: z.string().optional(),
  usualCompanyName: z.string().optional(),
  address: addressSchema,
});
