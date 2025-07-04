import http from 'node:http'
import {Transform} from 'node:stream'
import { buffer } from 'node:stream/consumers'

class InverseNumberStream extends Transform {
  _transform (chunk, encoding, callback){
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed))) //precisa transformar em buffer novamente - Buffer é o modelo que o node usa pra transicionar dados entre streams
  }
}

// require and responde são streams, toda entrada e saida em node é uma stream
// req => seria semelhante ao Readable
// res => semelhando ao Writable

const server = http.createServer(async(req,res) => {
  const buffers = []

  for await (const chunk of req) { //aguarda cada chunk (pedaço) ser retornado pela stream
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString() // armazenar todos os dados retornados

  console.log(fullStreamContent)

  return res.end(fullStreamContent)

  // return req
  //   .pipe(new InverseNumberStream)
  //   .pipe(res)
})

server.listen(3334)