from fastapi import APIRouter
from models.historico import Compra
from services.historico_service import (
    salvar_compra,
    listar_historico
)

router = APIRouter(prefix="/compras", tags=["Compras"])


@router.post("/finalizar")
def finalizar_compra(compra: Compra):
    salvar_compra(compra)

    return {
        "mensagem": "Compra finalizada com sucesso"
    }


@router.get("/historico")
def historico():
    return listar_historico()