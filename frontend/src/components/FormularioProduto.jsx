import { useState } from 'react'
import { produtosAPI } from '../api'

export default function FormularioProduto({ onProdutoCriado }) {
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    preco: '',
    quantidade_estoque: '',
    categoria: ''
  })
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.codigo || !formData.nome || !formData.preco || !formData.quantidade_estoque || !formData.categoria) {
      setErro('Todos os campos são obrigatórios!')
      return
    }

    try {
      setCarregando(true)
      setErro(null)
      
      await produtosAPI.criar({
        codigo: parseInt(formData.codigo),
        nome: formData.nome,
        preco: parseFloat(formData.preco),
        quantidade_estoque: parseInt(formData.quantidade_estoque),
        categoria: formData.categoria
      })

      alert('Produto criado com sucesso!')
      setFormData({
        codigo: '',
        nome: '',
        preco: '',
        quantidade_estoque: '',
        categoria: ''
      })
      onProdutoCriado()
    } catch (err) {
      setErro(err.response?.data?.detail || err.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cadastrar Novo Produto</h2>

      {erro && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-600">
          {erro}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código *
          </label>
          <input
            type="number"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome *
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço (R$) *
          </label>
          <input
            type="number"
            step="0.01"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantidade em Estoque *
          </label>
          <input
            type="number"
            name="quantidade_estoque"
            value={formData.quantidade_estoque}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria *
          </label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={carregando}
          className="flex-1 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium disabled:bg-gray-400"
        >
          {carregando ? 'Criando...' : 'Criar Produto'}
        </button>
      </div>
    </form>
  )
}
