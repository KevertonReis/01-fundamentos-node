import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
import { routes } from "./routes.js";

// UUID é um identificador único universal, usado para identificar de forma única um objeto ou entidade em sistemas distribuídos.

//3 tipo de parametros de rota:
//em URL
// - Query Params: ?search=algumacoisa&limit=10 (usado para filtros, paginação, etc.)
// - Route Params: /users/1 (usado para identificar um recurso específico) 
//fora da URL 
// - Request Body: envio de informaçoes de um formulario { "name": "John", "email": "}

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path); //extrai os parametros da rota

    req.params = { ...routeParams.groups}

    return route.handler(req, res);
  }

  return res.writeHead(404).end("Not Found");
});

console.log("Servidor rodando na porta 3333");

server.listen(3333);
