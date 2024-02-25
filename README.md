# Back-end verdureiro

## Ferramentas utilizadas: 

### Prisma: 
O Prisma ORM é uma ferramenta utilizada para simplificar a interação entre aplicações web e bancos de dados relacionais. Ao ser aplicado no contexto do Node.js e TypeScript, o Prisma oferece benefícios significativos. Sua compatibilidade com TypeScript proporciona um desenvolvimento mais robusto, prevenindo erros relacionados a tipos de dados. A integração com TypeScript permite a definição de modelos de dados usando interfaces, oferecendo uma abordagem mais segura e intuitiva para lidar com o esquema do banco de dados. Além disso, o Prisma gera automaticamente um cliente TypeScript tipado com base no esquema, facilitando a execução de consultas de forma segura e eficiente. Ao combinar Node.js, TypeScript e Prisma, pode-se criar aplicações backend mais escaláveis, mantendo a clareza e a segurança do código. Essa abordagem fortalece a integridade do desenvolvimento web, proporcionando uma camada de abstração eficiente entre a aplicação e o banco de dados relacional.

### Bcryptjs:
O `bcryptjs` é uma biblioteca JavaScript que implementa o algoritmo de hash bcrypt, amplamente utilizado para armazenamento seguro de senhas em aplicações web. Ele oferece proteção contra ataques de força bruta através de processos computacionalmente intensivos e a adição de "salts" únicos para cada senha. A facilidade de uso e a implementação em JavaScript tornam o `bcryptjs` uma escolha comum para integração em projetos nessa linguagem. Ele gera hashes seguros e permite a verificação de senhas de forma eficaz, contribuindo para a segurança robusta no armazenamento e autenticação de senhas.

### Autenticação JsonWebToken(JWT):

JSON Web Token (JWT) é um padrão de token amplamente utilizado para autenticação e autorização em aplicações web. Ele fornece uma maneira compacta e segura de transmitir informações entre partes confiáveis. Um JWT é composto por três partes: o cabeçalho (header), a carga útil (payload) e a assinatura. O cabeçalho especifica o tipo do token e o algoritmo de assinatura, enquanto a carga útil contém as informações desejadas, como a identificação do usuário e suas permissões. A assinatura é gerada usando a chave secreta do servidor, garantindo a integridade dos dados. Esse token pode ser facilmente transmitido via HTTP e armazenado no lado do cliente, oferecendo uma solução eficaz para autenticação segura em sistemas Web.

### Tsrynge: 

O TSyringe é uma biblioteca de contêiner de injeção de dependência projetada para facilitar a organização e gerenciamento de dependências em projetos TypeScript. Utilizando os decoradores do TypeScript, ela oferece uma maneira mais intuitiva de configurar e resolver dependências entre componentes. Essa abordagem visa simplificar o desenvolvimento, promovendo a modularidade e a manutenção do código. Por meio de seus recursos, o TSyringe contribui para uma arquitetura mais flexível e extensível em aplicações TypeScript.

### Multer:

O `multer` é uma middleware para Node.js, frequentemente usado com Express, facilitando o tratamento de dados de formulários do tipo `multipart/form-data`, comumente usados para uploads de arquivos ou imagens.

### Firebase storage:

O Firebase Storage é um serviço de armazenamento em nuvem oferecido pelo Google Firebase, projetado para armazenar e gerenciar diversos tipos de arquivos, como imagens, vídeos e documentos, em aplicativos web e móveis. Ele fornece uma infraestrutura escalável e fácil de usar para o armazenamento de objetos na nuvem.

## Descrição da API: 
A principal função da API é disponibilizar dados para o front-end do projeto verdureiro. A aplicação engloba três tabelas: usuários, produtos e reservas. Apenas usuários autenticados têm acesso a determinadas rotas da aplicação, como a criação de novos produtos. A tabela de produtos é responsável por armazenar todas as manipulações realizadas pela API. Já a tabela de reservas registra as reservas feitas pelos clientes, proporcionando um controle eficiente sobre essas transações.

## Entidade Usuários
| Coluna      | Tipo       | Restrições                            |
|-------------|------------|---------------------------------------|
| id          | String     | Chave primária, padrão UUID           |
| email       | String     | Único                                 |
| name        | String     |                                       |
| password    | String     |                                       |
| contact     | String     |                                       |
| created_at  | DateTime   | Padrão para a data de criação         |
| updated_at  | DateTime   | Atualizado automaticamente            |
| products    | Product[]  | Relacionamento com a tabela Product   |

## Rotas com Verificação de Autenticação e Validadas com o Celebrate/Joi

### GET users/profile
- **Descrição:** Retorna informações sobre o perfil do usuário autenticado.
- **Middleware:** Utiliza o middleware `isAuthenticate` para garantir que o usuário esteja autenticado antes de acessar as informações.

**Resposta:**
```json
{
  "id": "7861c42d-e621-4660-b55c-bfe250d7c646",
  "email": "email@example.com",
  "name": "Nome",
  "contact": "38987654321",
  "created_at": "2024-02-19T13:35:06.572Z",
  "update_at": "2024-02-19T13:35:06.572Z"
}
```

### POST users/
- **Descrição:** Cria um novo usuário.
- **Validação:** Utiliza o Celebrate com o Joi para validar os dados fornecidos no corpo da solicitação.

**Corpo da Solicitação:**
```json
{
  "email": "email@example.com",
  "name": "Nome",
  "password": "password",
  "contact": "38987654321"
}
```
**Resposta:**
```json
{
  "id": "7861c42d-e621-4660-b55c-bfe250d7c646",
  "email": "email@example.com",
  "name": "Nome",
  "contact": "38987654321",
  "created_at": "2024-02-19T13:35:06.572Z",
  "update_at": "2024-02-19T13:35:06.572Z"
}
```

### PATCH users/profile
- **Descrição:** Atualiza o perfil do usuário autenticado.
- **Validação:** Utiliza o Celebrate com o Joi para validar os dados fornecidos no corpo da solicitação.
- **Middleware:** Utiliza o middleware `isAuthenticate` para garantir que o usuário esteja autenticado antes de acessar as informações.

**Corpo da Solicitação:**
```json
{
  "name": "Nome atualizado",
  "contact": "38987654321"
}
```

**Resposta:**
```json
{
"message": "User updated successfully",
  "user": {
  "id": "295faee4-81ea-4b8b-bd71-5690f5a13720",
  "email": "email@example.com",
  "name": "Nome atualizado",
  "contact": "38 998572431",
  "created_at": "2024-02-13T20:49:48.300Z",
  "update_at": "2024-02-14T13:23:28.578Z"
  }
}
```

### DELETE users/profile
- **Descrição:** Exclui o perfil do usuário autenticado.
- **Middleware:** Utiliza o middleware `isAuthenticate` para garantir que o usuário esteja autenticado antes de acessar as informações.

**Resposta:**
```json
{
"message": "User deleted successfully",
  "user": {
  "id": "295faee4-81ea-4b8b-bd71-5690f5a13720",
  "email": "email@example.com",
  "name": "Nome atualizado",
  "contact": "38 998572431",
  "created_at": "2024-02-13T20:49:48.300Z",
  "update_at": "2024-02-14T13:23:28.578Z"
  }
}
```

### POST /login
- **Descrição:** Cria uma nova sessão para o usuário.
- **Validação:** Utiliza o Celebrate com o Joi para validar os dados fornecidos no corpo da solicitação.

**Corpo da Solicitação:**
```json
{
  "email": "email@example.com",
  "password": "password"
}
```
**Resposta:**
```json
{
"user": {
  "id": "7861c42d-e621-4660-b55c-bfe250d7c646",
  "email": "joao@teste.com",
  "name": "joao Santos",
  "password": "$2a$08$zekFmY6hWpeRux1pcHyUR.rn3sfq2z/90Dd8PedMiR2GMgbkUFY4a",
  "contact": "99999999",
  "created_at": "2024-02-19T13:35:06.572Z",
  "update_at": "2024-02-19T13:35:06.572Z"
},
  "acessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDgzNDk3MjEsImV4cCI6MTcwODQzNjEyMSwic3ViIjoiNzg2MWM0MmQtZTYyMS00NjYwLWI1NWMtYmZlMjUwZDdjNjQ2In0.IKvax13V_hDBgIYIekNYMVCn60KTG7RnyaWav5uYGU0"
}
```

## Entidade Produtos

| Coluna       | Tipo          | Restrições                                 |
|--------------|---------------|--------------------------------------------|
| id           | String        | Chave primária, padrão UUID                |
| name         | String        | Único                                      |
| description  | String        |                                            |
| category     | String        |                                            |
| price        | Decimal       |                                            |
| quantity     | Int           |                                            |
| images       | String?       |                                            |
| userId       | String        |                                            |
| user_id      | User          | Relacionamento com a tabela User           |
| created_at   | DateTime      | Padrão para a data de criação              |
| updated_at   | DateTime      | Atualizado automaticamente                 |
| Reservations | Reservation[] | Relacionamento com a tabela Reservation    | 

## Rotas com Verificação de Autenticação e Validadas com o Celebrate/Joi

### GET /products
- **Descrição:** Lista todos os produtos disponíveis.
**Resposta:**
```json
{
  "id": "e09755e2-ee15-4857-b40c-3244a18d3462",
  "name": "Batata",
  "description": "Batata fresca",
  "category": "Verdura",
  "price": "2",
  "quantity": 28,
  "images": "https://storage.googleapis.com/projetoverdureiro.appspot.com/25a57705bf951b5a474d_batata.jpg",
  "userId": "7861c42d-e621-4660-b55c-bfe250d7c646",
  "created_at": "2024-02-19T13:35:41.866Z",
  "update_at": "2024-02-19T19:47:44.547Z"
}
```

### GET /products/:id
- **Descrição:** Retorna informações sobre um produto específico com base no ID fornecido.
- **Validação:** Utiliza o Celebrate com o Joi para validar o parâmetro de caminho ":id" como um UUID.
- **Middleware:** Utiliza o middleware `isAuthenticate` para garantir que o usuário esteja autenticado antes de acessar as informações.

**Resposta:**
```json
{
  "id": "e09755e2-ee15-4857-b40c-3244a18d3462",
  "name": "Batata",
  "description": "Batata fresca",
  "category": "Verdura",
  "price": "2",
  "quantity": 28,
  "images": "https://storage.googleapis.com/projetoverdureiro.appspot.com/25a57705bf951b5a474d_batata.jpg",
  "userId": "7861c42d-e621-4660-b55c-bfe250d7c646",
  "created_at": "2024-02-19T13:35:41.866Z",
  "update_at": "2024-02-19T19:47:44.547Z"
}
```

### POST /products
- **Descrição:** Cria um novo produto.
- **Validação:** Utiliza o Celebrate com o Joi para validar os dados fornecidos no corpo da solicitação.
- **Middleware:** Utiliza o middleware `isAuthenticate` para garantir que o usuário esteja autenticado antes de criar um novo produto.

**Corpo da Solicitação:**
```json
{
  "name": "Nome do Produto",
  "description": "Descrição do Produto",
  "category": "Categoria do Produto",
  "price": 19.99,
  "quantity": 50,
  "images": "URL da Imagem do Produto"
}
```

### PATCH /products/:id
- **Descrição:** Atualiza as informações de um produto existente com base no ID fornecido.
- **Validação:**
  - Utiliza o Celebrate com o Joi para validar o parâmetro de caminho ":id" como um UUID.
  - Valida os dados fornecidos no corpo da solicitação.
- **Middleware:**
  - Utiliza o middleware `isAuthenticate` para garantir que o usuário esteja autenticado antes de realizar a atualização.
  - Utiliza o multer para lidar com o upload de imagens do produto.
  
**Corpo da Solicitação:**
```json
{
  "name": "Novo Nome do Produto",
  "description": "Nova Descrição do Produto",
  "category": "Nova Categoria do Produto",
  "price": "Novo Preço",
  "quantity": "Nova quantidade"
}
````
**Resposta:**
``` json
{
"message": "Product updated successfully",
  "product": {
    "id": "746f2e74-07fa-4dee-9eb9-46447ea85c62",
    "name": "Novo Nome do Produto",
    "description": "Nova Descrição do Produto",
    "category": "Nova Categoria do Produto",
    "price": "1",
    "quantity": 2,
    "images": "https://storage.googleapis.com/projetoverdureiro.appspot.com/128bfd4d9f52e776907b_batata.jpg",
    "userId": "ec7410f2-0c2e-448c-87c2-8c30ee0be407",
    "created_at": "2024-02-16T11:56:50.044Z",
    "update_at": "2024-02-16T12:49:27.202Z"
  }
}
```
### DELETE /products/:id
- **Descrição:** Exclui um produto existente com base no ID fornecido.
- **Validação:** Utiliza o Celebrate com o Joi para validar o parâmetro de caminho ":id".
- **Middleware:** Utiliza o middleware `isAuthenticate` para garantir que o usuário esteja autenticado antes de excluir o produto.

**Resposta:**
``` json
{
  "message": "Product deleted successfully",
  "product": {
    "id": "68db8c01-51b3-4c76-9206-1b71d4051946",
    "name": "produto",
    "description": "produto",
    "category": "categoria",
    "price": "2",
    "quantity": 30,
    "images": null,
    "userId": "5d45d792-c7e5-456d-80be-e9c045dae238",
    "created_at": "2024-02-15T22:16:11.224Z",
    "update_at": "2024-02-15T22:16:11.224Z"
  }
}
```

## Entidade Reservation

| Coluna               | Tipo       | Restrições                                |
|----------------------|------------|-------------------------------------------|
| id                   | String     | Chave primária, padrão UUID               |
| name                 | String     |                                           |
| email                | String     |                                           |
| address              | String     |                                           |
| quantityReservation  | Int        |                                           |
| totalPrice           | Decimal    |                                           |
| id_product           | Product    | Relacionamento com a tabela Product       |
| productId            | String     |                                           |
| active               | Boolean    | Padrão true (ativo)                       |
| contact              | String     |                                           |
| created_at           | DateTime   | Padrão para a data de criação             |
| updated_at           | DateTime   | Atualizado automaticamente                |

## Rotas com Verificação de Autenticação e Validadas com o Celebrate/Joi

### GET /reservations
- **Descrição:** Lista todas as reservas do usuário autenticado.
- **Middleware:** Utiliza o middleware `isAuthenticate` para garantir que o usuário esteja autenticado antes de acessar as informações.

**Resposta:**
```json
[
  {
    "id": "1a2b3c4d-5e6f-7g8h-9i10",
    "name": "Nome do Cliente",
    "email": "cliente@example.com",
    "address": "Endereço de Entrega",
    "quantityReservation": 2,
    "totalPrice": 39.98,
    "active": true,
    "contact": "38999996688",
    "created_at": "2024-02-19T13:35:06.572Z",
    "updated_at": "2024-02-19T13:35:06.572Z"
  },
  "// ... Outras reservas"
]
```

### GET /reservations/:id
- **Descrição:** Retorna informações detalhadas sobre uma reserva específica com base no ID fornecido.
- **Validação:** Utiliza o Celebrate com o Joi para validar o parâmetro de caminho ":id" como um UUID.
- **Middleware:** Utiliza o middleware `isAuthenticate` para garantir que o usuário esteja autenticado antes de acessar as informações.

**Resposta:**
```json
{
  "id": "1a2b3c4d-5e6f-7g8h-9i10",
  "name": "Nome do Cliente",
  "email": "cliente@example.com",
  "address": "Endereço de Entrega",
  "quantityReservation": 2,
  "totalPrice": 39.98,
  "active": true,
  "contact": "38999886699",
  "product": {
    "id": "7861c42d-e621-4660-b55c-bfe250d7c646",
    "name": "Nome do Produto",
    "description": "Descrição do Produto",
    "category": "Categoria do Produto",
    "price": 19.99,
    "quantity": 50,
    "images": "URL da Imagem",
    "userId": "295faee4-81ea-4b8b-bd71-5690f5a13720",
    "created_at": "2024-02-19T13:35:06.572Z",
    "updated_at": "2024-02-19T13:35:06.572Z"
  },
  "created_at": "2024-02-19T13:35:06.572Z",
  "updated_at": "2024-02-19T13:35:06.572Z"
}
```

### POST /reservations/:id
- **Descrição:** Cria uma nova reserva para um produto específico.
- **Validação:**
  - Utiliza o Celebrate com o Joi para validar o parâmetro de caminho ":id" como um UUID e valida os dados fornecidos no corpo da solicitação.

**Corpo da Solicitação:**
```json
{
  "name": "Nome do Cliente",
  "email": "cliente@example.com",
  "address": "Endereço de Entrega",
  "quantityReservation": 2,
  "contact": "38999886699"
}
```

**Resposta:**
```json
"message": "reservation made successfully",
"reservation": {
  "id": "3670e363-1a42-4ff4-8727-7c9cf14e36d8",
  "name": "Cliente",
  "email": "cliente@example.com",
  "address": "Endereço de entrega",
  "quantityReservation": 2,
  "totalPrice": "4",
  "productId": "e09755e2-ee15-4857-b40c-3244a18d3462",
  "active": true,
  "contact": "5538998380899",
  "created_at": "2024-02-19T19:57:10.835Z",
  "update_at": "2024-02-19T19:57:10.835Z",
  "id_product": {
  "id": "e09755e2-ee15-4857-b40c-3244a18d3462",
  "name": "Produto",
  "description": "Descrição do produto",
  "category": "Categoria do produto",
  "price": "2",
  "quantity": 28,
  "images": "https://storage.googleapis.com/projetoverdureiro.appspot.com/25a57705bf951b5a474d_batata.jpg",
  "userId": "7861c42d-e621-4660-b55c-bfe250d7c646",
  "created_at": "2024-02-19T13:35:41.866Z",
  "update_at": "2024-02-19T19:47:44.547Z"
  }
}
```

### DELETE /reservations/:id
- **Descrição:** Exclui uma reserva específica com base no ID fornecido.
- **Validação:** Utiliza o Celebrate com o Joi para validar o parâmetro de caminho ":id" como um UUID.
- **Middleware:** Utiliza o middleware `isAuthenticate` para garantir que o usuário esteja autenticado antes de excluir a reserva.

**Resposta:**

```json
{
"message": "Reservation successfully deleted",
"reservation": {
  "id": "9de27c35-d9a5-4001-88b6-16e307e554e2",
  "name": "Nome do Cliente",
  "email": "algoritmos.2bsi@gmail.com",
  "quantityReservation": 5,
  "totalPrice": "10",
  "productId": "1698ae93-addd-4a42-a683-7e83f5530d18",
  "active": true,
  "created_at": "2024-02-12T20:12:05.104Z",
  "update_at": "2024-02-12T20:12:05.104Z",
  "id_product": {
    "id": "1698ae93-addd-4a42-a683-7e83f5530d18",
    "name": "Produto",
    "description": "Descrição do produto",
    "category": "categoria do produto",
    "price": "2",
    "quantity": 20,
    "images": null,
    "userId": "3bd8bc9c-85a3-42a0-9797-5497527991cb",
    "created_at": "2024-02-12T18:16:54.444Z",
    "update_at": "2024-02-12T20:12:05.112Z"
    }
  }
}
```
