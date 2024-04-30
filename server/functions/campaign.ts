import { faker } from "@faker-js/faker";

export const fakeCampaign = (seed: number) => {
  faker.seed(seed);
  return {
    id: faker.company.name(),
    surveyId: faker.string.uuid(),
    year: faker.number.int({ min: 2000, max: 2023 }),
    campaignWording: faker.lorem.words({ min: 4, max: 10 }),
    period: faker.string.alpha({ length: 3 }),
  };
};
