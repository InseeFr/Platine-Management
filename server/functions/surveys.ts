import { faker } from "@faker-js/faker";
import { fakeAddress } from "./address.ts";

export const fakeSurveyUnit = (seed: number) => {
  faker.seed(seed);
  return {
    idSu: faker.string.uuid(),
    identificationCode: faker.number.int({ min: 10000000, max: 99999999 }),
    identificationName: faker.company.name(),
    address: fakeAddress(),
  };
};
