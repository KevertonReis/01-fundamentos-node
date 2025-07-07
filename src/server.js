import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
import { routes } from "./routes.js";

// UUID é um identificador único universal, usado para identificar de forma única um objeto ou entidade em sistemas distribuídos.

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.url === url;
  });

  if (route) {
    return route.handler(req, res, database);
  }

  return res.writeHead(404).end("Not Found");
});

console.log("Servidor rodando na porta 3333");

server.listen(3333);
