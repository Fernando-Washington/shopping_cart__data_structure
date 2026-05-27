import { useState } from 'react'

export default function CartaoProduto({ produto, onAdicionarAoCarrinho }) {
  const [quantidade, setQuantidade] = useState(1)

  const handleAdicionar = () => {
    if (quantidade > produto.quantidade_estoque) {
      alert('Quantidade acima do disponível!')
      return
    }
    onAdicionarAoCarrinho(produto, quantidade)
    setQuantidade(1)
  }

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 flex-1">{produto.nome}</h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            #{produto.codigo}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">{produto.categoria}</p>

        <div className="mb-4">
          <p className="text-2xl font-bold text-green-600">
            R$ {Number(produto.preco).toFixed(2)}
          </p>
          <p className={`text-sm mt-1 ${
            produto.quantidade_estoque > 0
              ? 'text-green-600'
              : 'text-red-600'
          }`}>
            {produto.quantidade_estoque > 0
              ? `${produto.quantidade_estoque} em estoque`
              : 'Fora de estoque'}
          </p>
        </div>

        {produto.quantidade_estoque > 0 && (
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max={produto.quantidade_estoque}
              value={quantidade}
              onChange={(e) => setQuantidade(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAdicionar}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
            >
              Adicionar
            </button>
          </div>
        )}

        {produto.quantidade_estoque === 0 && (
          <button disabled className="w-full px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed font-medium">
            Fora de Estoque
          </button>
        )}
      </div>
    </div>
  )
}
