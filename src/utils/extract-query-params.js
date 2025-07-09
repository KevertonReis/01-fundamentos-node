// search=keverton

export function extractQueryParams(query) {
  return query
    .substr(1)
    .split('&') //split para separar os parametros pelo & = ['search=keverton', 'page=2'] transforma em array
    .reduce((queryParams, param) => {
      // reduce percorre o array e transforma ele em qualquer outra coisa
      const [key, value] = param.split('=') //dividindo o paramento em chave e valor (em array) = ['page', '2']

      queryParams[key] = value

      return queryParams
    }, {}) // a chave {} é o segundo parametro, usado pra transormar os dados em objeto
}
