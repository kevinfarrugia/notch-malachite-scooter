const { createHash } = require("crypto");
const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");

const { delay } = require("./utils");

/** start: configure fastify **/
const fastify = require("fastify")({
  logger: false,
});

// create a proxy to direct requests to /images to cdn.glitch.global
fastify.register(require("@fastify/http-proxy"), {
  upstream: "https://cdn.glitch.global/b6592dee-457d-4490-b17e-3afa965ee9ee/",
  prefix: "/fonts",
  disableCache: true,
  
  // add a 1000 millisecond delay
  preHandler: async function (_req, _res, next) {
    await delay(1000);
    next();
  }
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
});

fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: Handlebars,
  },
});
/** end: configure fastly **/

fastify.get("/", function (request, reply) {
  let params = {};
  
  reply.view("/src/pages/index.hbs", params);

  return reply;
});

fastify.get("/2", function (request, reply) {
  let params = {};
  
  reply.view("/src/pages/index-2.hbs", params);

  return reply;
});

fastify.get("/3", function (request, reply) {
  let params = {};
  
  reply.view("/src/pages/index-3.hbs", params);

  return reply;
});

// start the fastify server
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
  }
);
