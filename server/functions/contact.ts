import { faker } from "@faker-js/faker";

export const fakeContact = () => {
  return {
    identifier: faker.string.uuid(),
    externalId: faker.string.uuid(),
    civility: faker.person.gender(),
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    function: faker.person.jobTitle(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: {
      streetNumber: faker.location.buildingNumber(),
      repetitionIndex: "",
      streetType: "rue",
      streetName: faker.location.street(),
      addressSupplement: "",
      cityName: faker.location.city(),
      zipCode: faker.location.zipCode(),
      cedexCode: "",
      cedexName: "",
      specialDistribution: "",
      countryCode: faker.location.countryCode(),
      countryName: faker.location.country(),
    },
  };
};
