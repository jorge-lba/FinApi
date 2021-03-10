## FinApi - Financeira

Api desenvolvida durante as aulas do primeiro capitulo do curso Ignite NodeJS.

Durante o desenvolvimento colocamos em pratica conceitos básicos de **HTTP**, **Middleware** e **Express**.
---

### Como rodar o Projeto
```bash
    # Clonar o repositório
    $ git clone https://github.com/jorge-lba/FinApi

    # Entrar no diretório
    $ cd FinApi

    # Instalar as dependências
    $ yarn install

    # Iniciar o projeto
    $ yarn start
```

### Requisitos

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cliente
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta
- [x] Deve ser possível retornar o balanço

---

### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já exístente
- [x] Não deve ser possível buscar extrato em uma conta não exístente
- [x] Não deve ser possível fazer depósito em uma conta não exístente
- [x] Não deve ser possível fazer saque em uma conta não exístente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível excluir uma conta não exístente