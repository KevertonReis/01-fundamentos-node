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

  select(table) {
    const data = this.#database[table] ?? []

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
  
    if (rowIndex > -1) {
      this.#database[table]
    }
  }
}
