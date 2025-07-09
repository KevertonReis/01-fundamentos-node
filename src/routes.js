import crypto from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'


const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query // extrai o termo de pesquisa da query string

      const users = database.select('users', search ? { // passa o termo de pesquisa para a função select
        name: search,
        email: search,
      } : null) 
      return res.end(JSON.stringify(users))
    }
  },

  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
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
  },

  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {

      const {id} = req.params

      database.delete('users', id)

      return res.writeHead(201).end()
    }
  },

  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {

      const {id} = req.params
      const {name, email} = req.body

      database.update('users', id, {
        name,
        email,
        created_at: new Date(),
      })

      return res.writeHead(201).end()
    }
  }
]
