import Fastify from "fastify";
import { fakeSinglePagination } from "./functions/pagination.ts";
import { times } from "./functions/array.ts";
import { fakeContact } from "./functions/contact.ts";

import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
  credentials: true,
});

fastify.get("/api/contacts", function (request) {
  const page = parseInt((request.query as any).page ?? "1", 10);
  return {
    content: times(20, k => fakeContact(k + (page - 1) * 20)),
    ...fakeSinglePagination(page),
  };
});

// Run the server!
try {
  await fastify.listen({ port: 8000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
