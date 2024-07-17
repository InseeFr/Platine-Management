import { z } from "zod";
import { addressSchema } from "./addressSchema.ts";

export const contactSchema = z.object({
  civility: z.enum(["Female", "Male", "Undefined"]),
  lastName: z
    .string()
    .nullish()
    .transform(val => (val === null ? "" : val)),
  firstName: z
    .string()
    .nullish()
    .transform(val => (val === null ? "" : val)),
  function: z
    .string()
    .nullish()
    .transform(val => (val === null ? "" : val)),
  email: z
    .string()
    .email({ message: "Veuillez saisir une adresse mail valide." })
    .or(z.literal(""))
    .nullish()
    .transform(val => (val === null ? "" : val)),
  phone: z
    .string()
    .nullish()
    .transform(val => (val === null ? "" : val)),

  secondPhone: z
    .string()
    .nullish()
    .transform(val => (val === null ? "" : val)),
  otherPhone: z
    .string()
    .nullish()
    .transform(val => (val === null ? "" : val)),
  identificationName: z
    .string()
    .nullish()
    .transform(val => (val === null ? "" : val)),
  usualCompanyName: z
    .string()
    .nullish()
    .transform(val => (val === null ? "" : val)),
  address: addressSchema,
});
