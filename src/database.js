import fs from "node:fs/promises";

const dbFilePath = new URL( '../db.json', import.meta.url)

export class Database {
  #database = {};

	constructor() {
  	fs.readFile(dbFilePath, 'utf8')
		.then(data => {
			this.#database = JSON.parse(data)
		})
		.catch(() => {
			this.#persist();
		})
	}

  #persist() {
		fs.writeFile('db.json', JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? [] // se a tabela nao existir, retorna um array vazio

    if (search) {
      data = data.filter(row => { // filtra os dados da tabela com base no termo de pesquisa
        return Object.entries(search).some(([key, value]) => { // percorre as entradas
          return row[key].toLowerCAse().includes(value.toLowerCAse()) // verifica se o valor da chave do objeto é igual ao valor do termo de pesquisa
        })
      })
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

	this.#persist();
    return data;

  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id) // percorre todas as linhas do database que tenham o ID igual ao ID selecionado para exclusao
  
    if (rowIndex > -1) { // maior que -1 significa que encontrou o ID
      this.#database[table].splice(rowIndex, 1); // remove o elemento do array
      this.#persist(); // persiste as alterações no arquivo 
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id) // percorre todas as linhas do database que tenham o ID igual ao ID selecionado para exclusao
  
    if (rowIndex > -1) { // maior que -1 significa que encontrou o ID
      this.#database[table][rowIndex] = {id, ...data} // altera o elemento do array
      this.#persist(); // persiste as alterações no arquivo 
    }
  }
}
