from fastapi import FastAPI

from routes.produtos import router as produtos_router
from routes.carrinho import router as carrinho_router
from routes.compras import router as compras_router

app = FastAPI()

app.include_router(produtos_router)
app.include_router(carrinho_router)
app.include_router(compras_router)