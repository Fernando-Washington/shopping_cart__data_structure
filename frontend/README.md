# Shopping Cart - Frontend React

Frontend completo para o sistema de carrinho de compras desenvolvido em React com Vite e Tailwind CSS.

## Instalação

```bash
cd frontend
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## Build

```bash
npm run build
```

## Funcionalidades

- ✅ Listagem de produtos com ordenação (nome/preço)
- ✅ Cadastro de novos produtos
- ✅ Adicionar/remover produtos do carrinho
- ✅ Visualização do total do carrinho
- ✅ Desfazer última ação (pilha)
- ✅ Finalizar compra
- ✅ Histórico de compras (lista encadeada)

## Estrutura de Componentes

- `Header` - Cabeçalho da aplicação
- `ListaProdutos` - Listagem e gerenciamento de produtos
- `CartaoProduto` - Componente individual do produto
- `FormularioProduto` - Formulário para cadastrar produto
- `Carrinho` - Visualização e gerenciamento do carrinho
- `Historico` - Histórico de compras realizadas

## API Integration

A aplicação se conecta com a API FastAPI em `http://localhost:8000`.

Certifique-se que o backend está rodando antes de iniciar o frontend.
