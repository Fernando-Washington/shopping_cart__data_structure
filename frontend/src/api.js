import axios from 'axios'

const API_BASE = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const produtosAPI = {
  listar: () => api.get('/produtos/'),
  criar: (produto) => api.post('/produtos/', produto),
  buscarPorCodigo: (codigo) => api.get(`/produtos/codigo/${codigo}`),
  buscarPorNome: (nome) => api.get(`/produtos/nome/${nome}`),
  ordenarPorNome: () => api.get('/produtos/ordenar/nome'),
  ordenarPorPreco: () => api.get('/produtos/ordenar/preco'),
}

export const carrinhoAPI = {
  listar: () => api.get('/carrinho/'),
  adicionar: (item) => api.post('/carrinho/', item),
  remover: (codigoProduto) => api.delete(`/carrinho/${codigoProduto}`),
  obterTotal: () => api.get('/carrinho/total'),
  desfazer: () => api.post('/carrinho/desfazer'),
}

export const comprasAPI = {
  finalizar: (compra) => api.post('/compras/finalizar', compra),
  listarHistorico: () => api.get('/compras/historico'),
}

export default api
