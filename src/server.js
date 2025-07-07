import http from  'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

// UUID é um identificador único universal, usado para identificar de forma única um objeto ou entidade em sistemas distribuídos.


const database = new Database

const server = http.createServer(async(req, res) => {
  const {method, url} = req

  await json(req,res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')
    return res.end(JSON.stringify(users))
  }
  
  if (method === 'POST' && url === '/users') {
    const {name, email} = req.body

    const user = {
      id: randomUUID(),
      name,
      email,
      created_at: new Date()
    }
    // Simula a inserção do usuário no banco de dados
    database.insert('users', user)
   
    return res.writeHead(201).end()
  }

  return res.writeHead(404).end('Not Found')
}) 

console.log("Servidor rodando na porta 3333")

server.listen(3333)