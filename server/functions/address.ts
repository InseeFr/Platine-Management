import { faker } from "@faker-js/faker";

export function fakeAddress() {
  return {
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
    countryCode: "FR",
    countryName: "France",
  };
}
