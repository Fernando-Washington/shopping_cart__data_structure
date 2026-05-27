import { useState, useEffect } from 'react'
import ListaProdutos from './components/ListaProdutos'
import Carrinho from './components/Carrinho'
import Historico from './components/Historico'
import Header from './components/Header'

export default function App() {
  const [aba, setAba] = useState('produtos')
  const [carrinhoAtualizado, setCarrinhoAtualizado] = useState(0)

  const handleCarrinhoAtualizado = () => {
    setCarrinhoAtualizado(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setAba('produtos')}
            className={`px-4 py-2 font-medium transition ${
              aba === 'produtos'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Produtos
          </button>
          <button
            onClick={() => setAba('carrinho')}
            className={`px-4 py-2 font-medium transition ${
              aba === 'carrinho'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Carrinho
          </button>
          <button
            onClick={() => setAba('historico')}
            className={`px-4 py-2 font-medium transition ${
              aba === 'historico'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Histórico
          </button>
        </div>

        {aba === 'produtos' && <ListaProdutos onCarrinhoAtualizado={handleCarrinhoAtualizado} />}
        {aba === 'carrinho' && <Carrinho key={carrinhoAtualizado} onCarrinhoAtualizado={handleCarrinhoAtualizado} />}
        {aba === 'historico' && <Historico />}
      </div>
    </div>
  )
}
