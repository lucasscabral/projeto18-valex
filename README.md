<h1 align="center"> Projeto Valex </h1>

## 👉É um projeto onde, as empresas geram cartões para os empregados,com o intuito de gerar um cartão benefício para os empregados, podendo eles,fazer pagamento ou recebendo recargas no cartão.


<h4 align="center"> 
	🚧  Projeto Valex 🚀 concluído.  🚧
</h4>

### 👉Features

-- Cadastro de cartão
-- Ativação do cartão
-- Bloqueio do cartão
-- Desbloqueio do cartão
-- Fazer recarga no cartão
-- Fazer compras com o cartão
-- Listagem das Trasações de um cartão,com o saldo da conta

### 👉EndPoints da Aplicação e descrição de cada um

--post("/companies/:idUser/card")
 **Esse endPoint Cria um cartão para o empregado,passando o identificador do empregado pela URL.**
--post("/companies/recharges")
 **Esse endPoint faz uma recarga no cartão do empregado,passando o identificador do cartaão e a quantia pelo corpo da requisição.**
 
--post("/employee/:idUser/card")
 **Esse endPoint ativa um cartão,passando o identificador do empregado pela URL e no corpo da requisição,passa o identificador do cartão,o codigoCvc e a senha.**

--get("/employee/:idUser/:idCard/cardTransactions")
 **Esse endPoint lista todas as transações e o saldo de um cartão do empregado,passando o identificador do empregado e no cartão pela URL.**
 
--post("/employee/blockCard/:idUser")
 **Esse endPoint bloqueia um cartão pelo empregado,passando o identificador do empregado pela URL e no corpo da requisição,passa o identificador do cartão e a senha do mesmo.**
 
--post("/employee/unlockCard/:idUser")
 **Esse endPoint desbloqueia um cartão pelo empregado,passando o identificador do empregado pela URL e no corpo da requisição,passa o identificador do cartão e a senha do mesmo.**
--post("/employee/payments")
 **Esse endPoint efetua uma compra pelo empregado,passando no corpo da requisição o identificador do cartão, a senha do mesmo,o identificador do Negócio e a quantia.**



### 👉Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/),[Postgres](https://www.postgresql.org/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 👉Gerando o Banco de Dados
```bash
# Clone este repositório
$ git clone <https://github.com/lucasscabral/projeto18-valex>

# Acesse a pasta do projeto no terminal/cmd
$ cd projeto18-valex

# Vá para a pasta valex-db/database
$ cd valex-db/database

# Rode o comando de criação do Banco de Dados
bash ./create-database

# Rode o comando de conexão com o Banco de Dados
bash ./connect-database

```
### 👉Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/lucasscabral/projeto18-valex>

# Acesse a pasta do projeto no terminal/cmd
$ cd projeto18-valex

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# Configure sua variável de ambiente
PORT = "número da porta disponível em seu PC"

# O servidor inciará na porta:PORT - acesse <http://localhost:PORT>
```
