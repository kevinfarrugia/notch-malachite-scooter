const path = require("path");

const getTime = (date) => date.toUTCString();

const generateRandomHtml = () =>
  `${[...Array(500)]
    .map(
      () =>
        "<p class='content'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta id, tempora rem accusamus ab ex, ratione ad exercitationem libero laudantium fugit reiciendis corrupti quis ipsam dolorum maxime perspiciatis nemo?</p>"
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
    title: "no-store",
    data: generateRandomHtml(),
  };

  reply.headers({});
  reply.view("/src/pages/index.hbs", params);

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
