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
  upstream: "https://cdn.glitch.global/b1719fef-02fe-465c-bde6-5da8fa0bbd91/",
  prefix: "/fonts",
  disableCache: true,
  
  // add a 1000 millisecond delay
  preHandler: async function (_req, _res, next) {
    await delay(600);
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

fastify.get("/4", function (request, reply) {
  let params = {};
  
  reply.view("/src/pages/index-4.hbs", params);

  return reply;
});

fastify.get("/5", function (request, reply) {
  let params = {};
  
  reply.view("/src/pages/index-5.hbs", params);

  return reply;
});

fastify.get("/6", function (request, reply) {
  let params = {};
  
  reply.view("/src/pages/index-6.hbs", params);

  return reply;
});

fastify.get("/7", function (request, reply) {
  let params = {};
  
  reply.view("/src/pages/index-7.hbs", params);

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
