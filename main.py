from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.produtos import router as produtos_router
from routes.carrinho import router as carrinho_router
from routes.compras import router as compras_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"mensagem": "API Shopping Cart - Bem-vindo!", "versao": "1.0"}

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(produtos_router)
app.include_router(carrinho_router)
app.include_router(compras_router)