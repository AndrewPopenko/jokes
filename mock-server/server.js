const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middleware = jsonServer.defaults();

server.use(middleware);
server.use(router);
// server.use(jsonServer.bodyParser);

console.log(server._router);
server.listen(4334, () => {
  console.log("Mock server listening on port 4334");
});
