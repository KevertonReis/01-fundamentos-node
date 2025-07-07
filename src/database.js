export class Database {
  constructor() {
    this.data = {}
  }

  get(table) {
    const data = this.data[table] ?? []

    return data
  }

  set(table, data) {
    this.data[table] = data
  }

  insert(table, item) {
    if (!this.data[table]) {
      this.data[table] = []
    }

    this.data[table].push(item)
  }
}