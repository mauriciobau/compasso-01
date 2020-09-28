## teste compasso 01

### Requisitos
    Cadastrar cidade
    Cadastrar cliente
    Consultar cidade pelo nome
    Consultar cidade pelo estado
    Consultar cliente pelo nome
    Consultar cliente pelo Id
    Remover cliente
    Alterar o nome do cliente

Considere o cadastro com dados básicos:

    Cidades: nome e estado
    Cliente: nome completo, sexo, data de nascimento, idade e cidade onde mora.


## Como executar o projeto

### Instalar as dependencias:
yarn

ou

npm install

### Criar bando de dados Sqlite
yarn typeorm migration:run

ou

npm run typeorm migration:run

### Iniciar servidor:
yarn dev:server

ou

npm run dev:server

Servidor irá iniciar na porta 3333

### Testes com Jest
Para executar os testes unitário já definidos:
yarn test

ou

npm run test

## Rotas

### Cadastro de Estado
http://localhost:3333/states
MÉTODO POST:
{
  "name": "Nome do estado"
}

### Consultar Estados cadastrados
http://localhost:3333/states
MÉTODO GET

### Consultar Cidades do Estado
http://localhost:3333/states/Nome do Estado
MÉTODO GET

### Cadastro de Cidade
http://localhost:3333/cities
MÉTODO POST:
{
	"name": "Nome da Ciade",
	"state_id": "ID-DO-ESTADO"
}

### Consultar Cidade pelo nome
http://localhost:3333/states
MÉTODO GET:
{
	"name": "Nome da Cidade"
}

### Cadastro de Cliente
http://localhost:3333/clients
{
	"name": "Nome do Cliente",
	"sex": "SEXO DO CLIENTE",
	"birth_date": "1989-01-25T00:00:00Z",
	"age": "31",
	"city_id": "ID-DA-CIDADE"
}

### Consultar Cliente pelo ID
http://localhost:3333/clients/ID-DO-CLIENTE
MÉTODO GET

### Consultar Cliente pelo nome
http://localhost:3333/clients
MÉTODO GET:
{
	"name": "Nome do Cliente"
}

### Alterar dados do Cliente pelo ID
http://localhost:3333/clients/ID-DO-CLIENTE
MÉTODO PUT:
{
	"name": "Cliente Teste",
	"sex": "Feminino",
	"birth_date": "1990-05-05T00:00:00Z",
	"age": "30",
	"city_id": "ID-DA-CIDADE"
}


### Deletar Cliente pelo ID
http://localhost:3333/clients/ID-DO-CLIENTE
MÉTODO DELETE

OBS: Deletar está com problema no retorno do Typeorm com o banco Sqlite, é um problema do próprio ORM que não está devolvendo um retorno da execução, por isso a execução fica rodando até expirar, mas o dado é deletado do bando de dados. Infelizmente não tive tempo para resolver este problema e deixar 100% funcional.
