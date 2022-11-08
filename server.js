const {createHash} = require("crypto");
const path = require("path");

const {getTime, generateRandomString} = require("./utils");

const md5 = (input) => createHash("md5").update(input).digest("hex");

/** start: configure fastly **/
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
/** end: configure fastly **/

/** start: routes **/

// welcome route
fastify.get("/", function (request, reply) {
  let params = {
    title: "Welcome",
  };

  reply.view("/src/pages/index.hbs", params);

  return reply;
});

/** start: demo routes **/
fastify.get("/1", function (request, reply) {
  let params = {
    time: getTime(new Date()),
    title: "no-store",
    data: generateRandomString(100, 200),
  };

  reply.headers({
    "cache-control": "no-store",
  });
  reply.view("/src/pages/demo.hbs", params);

  return reply;
});

// fastify.get("/2", function (request, reply) {
//   let params = {
//     time: getTime(new Date()),
//     title: "etag",
//     data: generateRandomString(),
//   };

//   const etag = md5(getTime(new Date()));

//   if (etag === request.headers["if-none-match"]) {
//     reply.statusCode = 304;
//     reply.send();
//   } else {
//     reply.headers({
//       "cache-control": "no-cache",
//       etag,
//     });
//     reply.view("/src/pages/demo.hbs", params);
//   }

//   return reply;
// });

// fastify.get("/3", function (request, reply) {
//   const time = getTime(new Date());
  
//   let params = {
//     time,
//     title: "last-modified",
//     data: generateRandomString(),
//   };

//   if (time === request.headers["if-modified-since"]) {
//     reply.statusCode = 304;
//     reply.send();
//   } else {
//     reply.headers({
//       "cache-control": "no-cache",
//       "last-modified": time,
//     });
//     reply.view("/src/pages/demo.hbs", params);
//   }

//   return reply;
// });

// fastify.get("/4", function (request, reply) {
//   let params = {
//     time: getTime(new Date()),
//     title: "max-age=30",
//     data: generateRandomString(),
//   };

//   const etag = md5(getTime(new Date()));

//   if (etag === request.headers["if-none-match"]) {
//     reply.statusCode = 304;
//     reply.send();
//   } else {
//     reply.headers({
//       "cache-control": "max-age=30",
//       etag,
//     });
//     reply.view("/src/pages/demo.hbs", params);
//   }

//   return reply;
// });
/** end: demo routes **/

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
