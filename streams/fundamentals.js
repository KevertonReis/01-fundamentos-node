// process.stdin.pipe(process.stdout) 

//streams do zero

//stream de leitura

import {Readable, Writable, Transform} from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1 

  _read () {
    const i = this.index++

    setTimeout(() => {

      if (i > 10) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
      
    }, 500);
  }
}

//stream de transformação

class InverseNumberStream extends Transform {
  _transform (chunk, encoding, callback){
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed))) //precisa transformar em buffer novamente - Buffer é o modelo que o node usa pra transicionar dados entre streams
  }
}

//stream de escrita

class MultiplyByTenStream extends Writable {
  _write (chunk, encoding, callback){
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}



new OneToHundredStream()            // leitura: apenas ler os dados
  .pipe(new InverseNumberStream())  // obrigatoriamente ler dados de um lugar e escrever em outro lugar - Stream de intermediação
  .pipe(new MultiplyByTenStream())  // escrita: escrever os dados

