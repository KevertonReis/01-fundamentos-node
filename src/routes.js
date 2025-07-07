import crypto from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    url: '/users',
    handler: (req, res, database) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    url: '/users',
    handler: (req, res, database) => {
      const { name, email } = req.body

      const user = {
        id: crypto.randomUUID(),
        name,
        email,
        created_at: new Date()
      }

      // Simula a inserção do usuário no banco de dados
      database.insert('users', user)

      return res.writeHead(201).end()
    }
  }
]
