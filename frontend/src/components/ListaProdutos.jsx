import { useState, useEffect } from 'react'
import { produtosAPI, carrinhoAPI } from '../api'
import FormularioProduto from './FormularioProduto'
import CartaoProduto from './CartaoProduto'

export default function ListaProdutos({ onCarrinhoAtualizado }) {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [ordenacao, setOrdenacao] = useState('padrao')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [busca, setBusca] = useState('')

  const carregarProdutos = async () => {
    try {
      setCarregando(true)
      const { data } = await produtosAPI.listar()
      setProdutos(data)
      setErro(null)
    } catch (err) {
      setErro('Erro ao carregar produtos: ' + err.message)
      console.error(err)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  const handleOrdenar = async (tipo) => {
    try {
      setCarregando(true)
      const { data } = tipo === 'nome' 
        ? await produtosAPI.ordenarPorNome()
        : await produtosAPI.ordenarPorPreco()
      setProdutos(data)
      setOrdenacao(tipo)
    } catch (err) {
      setErro('Erro ao ordenar: ' + err.message)
    } finally {
      setCarregando(false)
    }
  }

  const handleBuscar = async () => {
  try {
    setCarregando(true)

    if (busca.trim() === '') {
      await carregarProdutos()
      return
    }

    const { data } = await produtosAPI.buscarPorNome(busca)
    setProdutos(data)
    setErro(null)
  } catch (err) {
    setErro('Erro ao buscar produto: ' + err.message)
  } finally {
    setCarregando(false)
  }
}

  const handleAdicionarAoCarrinho = async (produto, quantidade) => {
    try {
      await carrinhoAPI.adicionar({
        produto,
        quantidade: parseInt(quantidade)
      })
      alert('Produto adicionado ao carrinho!')
      onCarrinhoAtualizado()
    } catch (err) {
      alert('Erro ao adicionar: ' + err.response?.data?.detail || err.message)
    }
  }

  const handleProdutoCriado = () => {
    setMostrarFormulario(false)
    carregarProdutos()
  }

  if (erro && !carregando) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <p className="text-red-600">{erro}</p>
        <button
          onClick={carregarProdutos}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2">          
        <div className="flex gap-2">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produto por nome"
            className="px-4 py-2 border border-gray-300 rounded w-full"
          />

          <button
            onClick={handleBuscar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Buscar
          </button>

          <button
            onClick={() => {
              setBusca('')
              carregarProdutos()
            }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Limpar
          </button>

          <button
            onClick={carregarProdutos}
            className={`px-4 py-2 rounded transition ${
              ordenacao === 'padrao'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Padrão
          </button>
        </div>

          <button
            onClick={() => handleOrdenar('nome')}
            className={`px-4 py-2 rounded transition ${
              ordenacao === 'nome'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Por Nome
          </button>
          <button
            onClick={() => handleOrdenar('preco')}
            className={`px-4 py-2 rounded transition ${
              ordenacao === 'preco'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Por Preço
          </button>
        </div>

        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {mostrarFormulario ? 'Cancelar' : 'Novo Produto'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <FormularioProduto onProdutoCriado={handleProdutoCriado} />
        </div>
      )}

      {carregando ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin">
            <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
      ) : produtos.length === 0 ? (
        <div className="bg-yellow-50 p-8 rounded-lg text-center border border-yellow-200">
          <p className="text-yellow-800 text-lg">Nenhum produto disponível</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtos.map(produto => (
            <CartaoProduto
              key={produto.codigo}
              produto={produto}
              onAdicionarAoCarrinho={handleAdicionarAoCarrinho}
            />
          ))}
        </div>
      )}
    </div>
  )
}
