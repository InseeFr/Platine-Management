import { z } from "zod";

export const addressSchema = z
  .object({
    streetNumber: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
    repetitionIndex: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
    streetType: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
    streetName: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
    addressSupplement: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
    specialDistribution: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
    cedexName: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
    cedexCode: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
    cityName: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
    zipCode: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
    countryName: z
      .string()
      .nullish()
      .transform(val => (val === null ? "" : val)),
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
        message: "Veuillez saisir un libellé Cedex.",
        path: ["cedexName"],
      });
    }
  });
