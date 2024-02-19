import Fastify from "fastify";
import { fakeSinglePagination } from "./functions/pagination.ts";
import { times } from "./functions/array.ts";
import { fakeContact } from "./functions/contact.ts";

import cors from "@fastify/cors";
import { fakeSurveyUnit } from "./functions/surveys.ts";
import { fakeCampaign } from "./functions/campaign.ts";
import { fakeCampaignPartitioning, fakeSurvey } from "./functions/survey.ts";
import { fakePeriodicities } from "./functions/periodicity.ts";

const wait = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
  credentials: true,
});

const paginatedUrls = [
  { path: "/api/contacts", content: fakeContact },
  { path: "/api/survey-units", content: fakeSurveyUnit },
  { path: "/api/surveys/search", content: fakeSurvey },
  { path: "/api/surveys", content: fakeSurvey },
  { path: "/api/campaigns", content: fakeCampaign },
];

for (const url of paginatedUrls) {
  fastify.get<{ Querystring: { page: string } }>(url.path, function (request) {
    const page = parseInt(request.query.page ?? "1", 10);
    return {
      content: times(20, k => url.content(k + (page - 1) * 20)),
      ...fakeSinglePagination(page),
    };
  });

  fastify.get<{ Params: { id: string } }>(`${url.path}/:id`, function (request) {
    return url.content(request.params.id.length);
  });
}

fastify.get("/api/periodicities", fakePeriodicities);
fastify.get("/api/surveys/:id/campaigns-partitionings", () => times(5, fakeCampaignPartitioning));
fastify.get("/api/sources/:id/surveys", () => times(5, fakeSurvey));

fastify.put<{ Params: { id: string } }>("/api/contacts/:id", async request => {
  await wait(1000);
  return fakeContact(parseInt(request.params.id, 10));
});

// Run the server!
try {
  await fastify.listen({ port: 8000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
