import { z } from "zod";
import { addressSchema } from "./addressSchema";

export const contactSchema = z.object({
  civility: z.enum(["Female", "Male", "Undefined"]),
  lastName: z.string().optional(),
  firstName: z.string().optional(),
  function: z.string().optional(),
  email: z.string().email({ message: "Veuillez saisir une adresse mail valide." }).or(z.literal("")),
  phone: z
    .string()
    .nullable()
    .transform(val => (val === null ? "" : val))
    .optional(),
  secondPhone: z.string().optional().or(z.literal("")),
  otherPhone: z.string().optional().or(z.literal("")),
  identificationName: z.string().optional(),
  usualCompanyName: z.string().optional(),
  address: addressSchema,
});
