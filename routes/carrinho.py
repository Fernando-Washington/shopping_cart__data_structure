from fastapi import APIRouter
from models.carrinho import ItemCarrinho
from services.carrinho_service import (
    adicionar_item,
    remover_item,
    listar_carrinho,
    calcular_total,
    desfazer_ultima_acao
)

router = APIRouter(prefix="/carrinho", tags=["Carrinho"])


@router.post("/")
def adicionar(item: ItemCarrinho):
    return adicionar_item(item)


@router.delete("/{codigo_produto}")
def remover(codigo_produto: int):
    return remover_item(codigo_produto)


@router.get("/")
def listar():
    return listar_carrinho()


@router.get("/total")
def total():
    return {
        "total": calcular_total()
    }


@router.post("/desfazer")
def desfazer():
    return {
        "mensagem": desfazer_ultima_acao()
    }