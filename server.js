const {createHash} = require("crypto");
const path = require("path");

const getTime = (date) => { 
  const coeff = 1000 * 10;
  return new Date(Math.floor(date.getTime() / coeff) * coeff).toUTCString();
}

const md5 = (input) => createHash("md5").update(input).digest("hex");

const generateRandomHtml = () =>
  `${[...Array(100)]
    .map(
      () =>
        "<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta id, tempora rem accusamus ab ex, ratione ad exercitationem libero laudantium fugit reiciendis corrupti quis ipsam dolorum maxime perspiciatis nemo?</p>"
    )
    .join("")}`;

const fastify = require("fastify")({
  logger: false,
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

fastify.get("/", function (request, reply) {
  let params = {
    time: getTime(new Date()),
    title: "Caching Demo",
    data: generateRandomHtml(),
  };

  reply.headers({
    "cache-control": "no-store",
  });
  reply.view("/src/pages/index.hbs", params);

  return reply;
});

fastify.get("/no-store", function (request, reply) {
  let params = {
    time: getTime(new Date()),
    title: "no-store",
    data: generateRandomHtml(),
  };

  reply.headers({
    "cache-control": "no-store",
  });
  reply.view("/src/pages/index.hbs", params);

  return reply;
});

fastify.get("/etag", function (request, reply) {
  let params = {
    time: getTime(new Date()),
    title: "etag",
    data: generateRandomHtml(),
  };

  const etag = md5(getTime(new Date()));

  if (etag === request.headers["if-none-match"]) {
    reply.statusCode = 304;
    reply.send();
  } else {
    reply.headers({
      "cache-control": "no-cache",
      etag,
    });
    reply.view("/src/pages/index.hbs", params);
  }

  return reply;
});

fastify.get("/last-modified", function (request, reply) {
  const time = getTime(new Date());
  
  let params = {
    time,
    title: "last-modified",
    data: generateRandomHtml(),
  };

  if (time === request.headers["if-modified-since"]) {
    reply.statusCode = 304;
    reply.send();
  } else {
    reply.headers({
      "cache-control": "no-cache",
      "last-modified": time,
    });
    reply.view("/src/pages/index.hbs", params);
  }

  return reply;
});

fastify.get("/max-age", function (request, reply) {
  let params = {
    time: getTime(new Date()),
    title: "max-age=30",
    data: generateRandomHtml(),
  };

  const etag = md5(getTime(new Date()));

  if (etag === request.headers["if-none-match"]) {
    reply.statusCode = 304;
    reply.send();
  } else {
    reply.headers({
      "cache-control": "max-age=30",
      etag,
    });
    reply.view("/src/pages/index.hbs", params);
  }

  return reply;
});

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
