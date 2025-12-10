## Tecnologias utilizadas

### Backend 
- Java
- Spring Boot
- Spring Data JPA

### Banco de Dados
- PostgreSQL
- FlywayDB

### Frontend
- TypeScript
- React
- Tailwindcss
- Material UI

### Infraestrutura
- Docker
- Docker compose

## Pré-requisitos

Para executar a aplicação, segue abaixo o que você precisa ter instalado na sua máquina:

- Docker
- Docker Compose

## Como executar a aplicação

Para executar a aplicação você deve clonar essa aplicação com o Git, digite o comando abaixo em um terminal de sua preferência

    git clone https://github.com/victorgarciadss/employee_management.git

Abra a aplicação em uma IDE de sua preferência e siga as instruções abaixo:

### 1 - Crie o arquivo '.env' na pasta raiz do projeto

### 2 - Adicione a variável de ambiente TOKEN_KEY dentro do arquivo .env, exemplo:

    TOKEN_KEY=<valor_qualquer>

### 3 - Entre na pasta /employeePortal onde fica o Frontend da aplicação

### 4 - Crie um arquivo .env dentro dessa pasta e adicione a variavel abaixo

    VITE_API_URL=http://localhost:8081

Obs: Optei por adicionar a URL da Api como variável de ambiente para facilitar a troca da URL na aplicação por completo de uma única vez

### 5 - Retorne a pasta raiz do projeto e com o Docker compose digite o comando abaixo:

    docker compose up --build

### 6 - Agora você conseguirá acessar a aplicação na URL abaixo:

    http://localhost:4173/

## Credenciais de acesso

Nessa aplicação foi inserido um usuário admin através da Migration pelo flyway, seguem abaixo os dados do usuário que pode ser feito o login diretamente no sistema:

- E-mail: pedro@gmail.com
- Senha: 1234