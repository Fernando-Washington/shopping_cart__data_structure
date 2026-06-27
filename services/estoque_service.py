from models.produto import Produto

produtos = {}


def cadastrar_produto(produto: Produto):
    produtos[produto.codigo] = produto
    return produto


def listar_produtos():
    return list(produtos.values())


def buscar_produto_por_codigo(codigo: int):
    return produtos.get(codigo)


def buscar_produto_por_nome(nome: str):
    resultado = []

    for produto in produtos.values():
        if nome.lower() in produto.nome.lower():
            resultado.append(produto)

    return resultado


def ordenar_por_nome():
    return sorted(produtos.values(), key=lambda p: p.nome)


def ordenar_por_preco():
    return sorted(produtos.values(), key=lambda p: p.preco)

def ordenar_por_nome():
    return sorted(produtos.values(), key=lambda p: p.nome.lower())


def ordenar_por_preco():
    return sorted(produtos.values(), key=lambda p: p.preco)