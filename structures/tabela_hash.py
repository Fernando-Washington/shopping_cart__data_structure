class TabelaHash:
    def __init__(self):
        self.tabela = {}

    def inserir(self, chave, valor):
        self.tabela[chave] = valor

    def buscar(self, chave):
        return self.tabela.get(chave)

    def remover(self, chave):
        if chave in self.tabela:
            del self.tabela[chave]