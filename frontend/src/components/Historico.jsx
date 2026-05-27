import { useState, useEffect } from 'react'
import { comprasAPI } from '../api'

export default function Historico() {
  const [compras, setCompras] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    carregarHistorico()
  }, [])

  const carregarHistorico = async () => {
    try {
      setCarregando(true)
      const { data } = await comprasAPI.listarHistorico()
      setCompras(data)
      setErro(null)
    } catch (err) {
      setErro('Erro ao carregar histórico: ' + err.message)
      console.error(err)
    } finally {
      setCarregando(false)
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
          onClick={carregarHistorico}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Histórico de Compras</h2>

      {compras.length === 0 ? (
        <div className="bg-gray-50 p-12 rounded-lg text-center border border-gray-200">
          <p className="text-gray-800 text-xl mb-2">Nenhuma compra realizada</p>
          <p className="text-gray-600">Suas compras aparecerão aqui!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {compras.map((compra, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Compra #{index + 1}
                  </h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      R$ {Number(compra.total).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-3">Itens:</h4>
                  <div className="space-y-2">
                    {compra.itens.map((item) => (
                      <div key={item.produto.codigo} className="flex justify-between text-sm bg-gray-50 p-3 rounded">
                        <div>
                          <p className="font-medium text-gray-800">{item.produto.nome}</p>
                          <p className="text-gray-600">Qtd: {item.quantidade}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                          </p>
                          <p className="text-gray-600 text-xs">
                            Unit: R$ {Number(item.produto.preco).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
