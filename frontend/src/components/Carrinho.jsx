import { useState, useEffect } from 'react'
import { carrinhoAPI, comprasAPI } from '../api'

export default function Carrinho({ onCarrinhoAtualizado }) {
  const [itens, setItens] = useState([])
  const [total, setTotal] = useState(0)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [finalizando, setFinalizando] = useState(false)

  const carregarCarrinho = async () => {
    try {
      setCarregando(true)
      const [itensResp, totalResp] = await Promise.all([
        carrinhoAPI.listar(),
        carrinhoAPI.obterTotal()
      ])
      setItens(itensResp.data)
      setTotal(totalResp.data.total)
      setErro(null)
    } catch (err) {
      setErro('Erro ao carregar carrinho: ' + err.message)
      console.error(err)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarCarrinho()
  }, [])

  const handleRemover = async (codigoProduto) => {
    try {
      await carrinhoAPI.remover(codigoProduto)
      alert('Produto removido!')
      await carregarCarrinho()
      onCarrinhoAtualizado()
    } catch (err) {
      alert('Erro: ' + err.message)
    }
  }

  const handleDesfazer = async () => {
    try {
      const { data } = await carrinhoAPI.desfazer()
      alert(`${data.mensagem}`)
      await carregarCarrinho()
      onCarrinhoAtualizado()
    } catch (err) {
      alert('Erro: ' + err.message)
    }
  }

  const handleFinalizarCompra = async () => {
    if (itens.length === 0) {
      alert('Carrinho vazio!')
      return
    }

    if (!confirm('Confirmar compra?')) return

    try {
      setFinalizando(true)
      await comprasAPI.finalizar({
        itens,
        total
      })
      alert('Compra finalizada com sucesso!')
      setItens([])
      setTotal(0)
      onCarrinhoAtualizado()
    } catch (err) {
      alert('Erro: ' + err.response?.data?.detail || err.message)
    } finally {
      setFinalizando(false)
    }
  }

  if (carregando) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <p className="text-red-600">{erro}</p>
        <button
          onClick={carregarCarrinho}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Carrinho de Compras</h2>

      {itens.length === 0 ? (
        <div className="bg-blue-50 p-12 rounded-lg text-center border border-blue-200">
          <p className="text-blue-800 text-xl mb-4">Seu carrinho está vazio</p>
          <p className="text-blue-600">Adicione produtos para continuar!</p>
        </div>
      ) : (
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Produto</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Preço</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Qtd</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Subtotal</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item) => (
                    <tr key={item.produto.codigo} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{item.produto.nome}</p>
                          <p className="text-sm text-gray-600">#{item.produto.codigo}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        R$ {Number(item.produto.preco).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {item.quantidade}
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleRemover(item.produto.codigo)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Resumo</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de itens:</span>
                  <span className="font-medium">{itens.reduce((sum, item) => sum + item.quantidade, 0)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span className="text-gray-800">Total:</span>
                  <span className="text-green-600">R$ {Number(total).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Ações</h3>
              <div className="space-y-2">
                <button
                  onClick={handleDesfazer}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition font-medium"
                >
                  Desfazer Última Ação
                </button>
                <button
                  onClick={handleFinalizarCompra}
                  disabled={finalizando || itens.length === 0}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium disabled:bg-gray-400"
                >
                  {finalizando ? 'Finalizando...' : 'Finalizar Compra'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
