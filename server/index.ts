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

fastify.get("/api/contacts", function () {
  return {
    content: times(20, fakeContact),
    ...fakeSinglePagination(),
  };
});

// Run the server!
try {
  await fastify.listen({ port: 8000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
