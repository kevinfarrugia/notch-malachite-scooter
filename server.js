const { createHash } = require("crypto");
const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");

const { delay } = require("./utils");

// total number of steps in this demo
const MAX_STEP = 8;

/** start: configure fastify **/
const fastify = require("fastify")({
  logger: false,
});

Handlebars.registerHelper(require("./helpers.js"));

// create a proxy to direct requests to /images to cdn.glitch.global
fastify.register(require("@fastify/http-proxy"), {
  upstream: "https://cdn.glitch.global/b6592dee-457d-4490-b17e-3afa965ee9ee/",
  prefix: "/fonts",
  disableCache: true,
  
  // add a 500 millisecond delay
  preHandler: async function (_req, _res, next) {
    await delay(500);
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
  layout: "/src/partials/layout.hbs",
  options: {
    partials: {
      heading: "/src/partials/heading.hbs",
      nav: "/src/partials/nav.hbs",
      footer: "/src/partials/footer.hbs",
    },
  },
  defaultContext: {
    maxStep: MAX_STEP,
  },
});
/** end: configure fastly **/

/** start: routes **/

// welcome route
fastify.get("/", function (request, reply) {
  let params = {
    title: "Learn Performance - Fonts",
  };

  reply.view("/src/pages/index.hbs", params);

  return reply;
});

/** start: demo routes **/
fastify.get("/1", function (request, reply) {
  let params = {
    step: 1,
    title: "Web Font",
    head: `<link rel='stylesheet' href='/open-sans.css'>
<link rel="stylesheet" href="/style.css">
<link rel='stylesheet' href='/fancy.css'>`
  };

  reply.view("/src/pages/1.hbs", params);

  return reply;
});

fastify.get("/2", function (request, reply) {
  let params = {
    step: 2,
    title: "preload",
    head: `<link rel="preload" as="font" href="/fonts/OpenSans-Regular.woff2?v=1676325285146" crossorigin>
<link rel='stylesheet' href='/open-sans.css'>
<link rel="stylesheet" href="/style.css">
<link rel='stylesheet' href='/fancy.css'>`
  };

  reply.view("/src/pages/2.hbs", params);

  return reply;
});

fastify.get("/3", function (request, reply) {
  let params = {
    step: 3,
    title: "Unused preload",
    head: `<link rel="preload" as="font" href="/fonts/OpenSans-Regular.woff2?v=1676325285146">
<link rel='stylesheet' href='/open-sans.css'>
<link rel="stylesheet" href="/style.css">
<link rel='stylesheet' href='/fancy.css'>`
  };

  reply.view("/src/pages/3.hbs", params);

  return reply;
});

fastify.get("/4", function (request, reply) {
  let params = {
    step: 4,
    title: "Inline @font-face",
    head: `<style>
@font-face {
  font-family: "Open Sans";
  src: url("/fonts/OpenSans-Regular.woff2?v=1676325285146");
}

.fancy {
  font-family: "Open Sans", sans-serif;
}
</style>`
  };

  reply.view("/src/pages/4.hbs", params);

  return reply;
});

fastify.get("/5", function (request, reply) {
  let params = {
    step: 5,
    title: "Inline @font-face and external stylesheets",
    head: `<style>
@font-face {
  font-family: "Open Sans";
  src: url("/fonts/OpenSans-Regular.woff2?v=1676325285146");
}
</style>
<link rel="stylesheet" href="/style.css">
<link rel='stylesheet' href='/fancy.css'>`
  };

  reply.view("/src/pages/5.hbs", params);

  return reply;
});

fastify.get("/6", function (request, reply) {
  let params = {
    step: 6,
    title: "Google Fonts",
    head: `<link rel="stylesheet" href="/style.css">
<link rel='stylesheet' href='/fancy.css'>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans" rel="stylesheet">`
  };

  reply.view("/src/pages/6.hbs", params);

  return reply;
});

fastify.get("/7", function (request, reply) {
  let params = {
    step: 7,
    title: "Google Fonts with preconnect",
    head: `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="/style.css">
<link rel='stylesheet' href='/fancy.css'>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">`
  };

  reply.view("/src/pages/7.hbs", params);

  return reply;
});

fastify.get("/8", function (request, reply) {
  let params = {
    step: 8,
  };

  reply.view("/src/pages/8.hbs", params);

  return reply;
});
/** end: routes **/

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
