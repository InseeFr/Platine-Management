import { z } from "zod";

export const addressSchema = z
  .object({
    streetNumber: z.string().optional(),
    repetitionIndex: z
      .string()
      .nullable()
      .transform(val => (val === null ? "" : val))
      .optional(),
    streetType: z
      .string()
      .nullable()
      .transform(val => (val === null ? "" : val))
      .optional(),
    streetName: z.string().optional(),
    addressSupplement: z
      .string()
      .nullable()
      .transform(val => (val === null ? "" : val))
      .optional(),
    specialDistribution: z
      .string()
      .nullable()
      .transform(val => (val === null ? "" : val))
      .optional(),
    cedexName: z
      .string()
      .nullable()
      .transform(val => (val === null ? "" : val)),
    cedexCode: z
      .string()
      .nullable()
      .transform(val => (val === null ? "" : val)),
    cityName: z
      .string()
      .nullable()
      .transform(val => (val === null ? "" : val)),
    zipCode: z
      .string()
      .nullable()
      .transform(val => (val === null ? "" : val)),
    countryName: z.string().optional().or(z.literal("")),
    codeChoice: z.string(),
  })
  .superRefine(({ cedexCode, zipCode, cityName, cedexName, codeChoice }, refinementContext) => {
    if (codeChoice === "zipCode" && (zipCode === undefined || zipCode === "")) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez saisir un code postal.",
        path: ["zipCode"],
      });
    }
    if (codeChoice === "zipCode" && (cityName === undefined || cityName === "")) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez saisir une commune.",
        path: ["cityName"],
      });
    }
    if (codeChoice === "cedexCode" && (cedexCode === undefined || cedexCode === "")) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez saisir un code cedex.",
        path: ["cedexCode"],
      });
    }
    if (codeChoice === "cedexCode" && (cedexName === undefined || cedexName === "")) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez saisir un bureau distributeur.",
        path: ["cedexName"],
      });
    }
  });
