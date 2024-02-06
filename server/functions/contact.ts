import { faker } from "@faker-js/faker";
import { fakeAddress } from "./address.ts";

export const fakeContact = (seed: number) => {
  faker.seed(seed);
  return {
    identifier: faker.string.uuid(),
    externalId: faker.string.uuid(),
    civility: faker.person.sex(),
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    function: faker.person.jobTitle(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: fakeAddress(),
  };
};
