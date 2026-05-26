from fastapi import APIRouter
from models.produto import Produto
from services.estoque_service import (
    cadastrar_produto,
    listar_produtos,
    buscar_produto_por_codigo,
    buscar_produto_por_nome,
    ordenar_por_nome,
    ordenar_por_preco
)

router = APIRouter(prefix="/produtos", tags=["Produtos"])


@router.post("/")
def criar_produto(produto: Produto):
    return cadastrar_produto(produto)


@router.get("/")
def listar():
    return listar_produtos()


@router.get("/codigo/{codigo}")
def buscar_por_codigo(codigo: int):
    return buscar_produto_por_codigo(codigo)


@router.get("/nome/{nome}")
def buscar_por_nome(nome: str):
    return buscar_produto_por_nome(nome)


@router.get("/ordenar/nome")
def ordenar_nome():
    return ordenar_por_nome()


@router.get("/ordenar/preco")
def ordenar_preco():
    return ordenar_por_preco()