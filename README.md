# challenge-backend


# <a target='_blank'><img align="left" width=50px height=50px src='https://user-images.githubusercontent.com/54849358/79355817-8d9a6200-7f14-11ea-9c3c-5ba42c4ce12a.png' /></a> Desafio de Mensageria em Microserviço

_É de suma importancia que você leia até o final antes de começar a fazer o desafio_ 

<br>

## <a target='_blank'><img align="left" width=40px height=40px src='https://user-images.githubusercontent.com/54849358/79353989-2f6c7f80-7f12-11ea-8f2a-39aaf259ad81.png' /></a> Bem-Vindo pequeno Padawan ao nosso desafio

 Aqui seus conhecimentos serão testados! Sua capacidade de lidar com problemas será testada! Sua força Jedi será testada! Então prepare-se, e se caso não estiver pronto... Bom, volte em outro momento, estaremos aguardando sua chegada. Que a Força esteja com você.
 
 <br>
 
 ## <a target='_blank'><img align="left" width=40px height=40px src='https://user-images.githubusercontent.com/54849358/79355150-afdfb000-7f13-11ea-9626-dbc376e40f8f.png' /></a> Não nos conhece?
 
 Somos uma equipe de desenvolvedores e lidamos com os mais diversos tipos de desafios todos os dias como este pequeno teste, e precisamos de novos aliados para nos ajudar com a resistencia contra o lado sombrio, caso esteja apto, você terá um grupo de Jedis habilidosos ao seu lado para ajudar em sua jornada, e talvez um dia você olhe para trás e veja o quão tranquilo foi essa batalha.
 
 Não há mais tempo, se você chegou até aqui, precisamos de novos combatentes!
  
<br>

## <a target='_blank'><img align="left" width=40px height=40px src='https://user-images.githubusercontent.com/54849358/79358887-372f2280-7f18-11ea-9c5f-a1da33e7a719.png' /></a> Regras

### Regras de Setup

- Padrão da API deve ser Restful (utilizando json);
- Faça a API na sua Stack de preferencia (acordado na entrevista);
- Utilize o MongoDB ou Postgres como banco de dados da aplicação;

### Requisitos Funcionais
- A aplicação deve ser capaz de receber uma key de integração;
- A aplicação deve ser capaz de validar a existência da key internamente;
- A aplicação deve ser capaz de receber requisições apenas de servidores permitidos (host e/ou ip);
- A aplicação deve ser capaz de receber via api um conteúdo HTML que será enviado no email;
- A aplicação deve ser capaz de disparar emails para os destinos informados;
- A aplicação deve ser capaz de receber multiplos destinatários e enviar os emails;
- A aplicação deve retornar um array com os email enviados com sucesso e os com erro;

### Requisitos não-funcionais
- Use o [Mailgun](https://www.mailgun.com/) para disparar os emails;
- Use o banco [MongoDB](https://mongodb.com) ou [Postgres](https://www.postgresql.org/) (se julgar necessário);
- A API deve seguir uma estrutura escalável, pensando em uma estrutura de menssageria onde no futuro poderão ser adicionadas outros métodos de envio tais como push notification e sms;
- Utilizar variáveis de ambiente (Environment), sem estar hardcoded (digitado no meio codigo). O ideal é utilizar variáveis de ambiente ou arquivos de configuração;

### Regras de Documentação

- Com tudo feito, gere uma documentação com [ApiDoc](https://apidocjs.com/), [Swagger](https://swagger.io/), [Apiary](https://apiary.io/) ou [Postman](https://www.postman.com/), com todos os endpoints da sua api, com payload e response (Tanto de sucesso quanto de erro).

<br>

## Extras

Os itens extras não são obrigatórios, e não afetam sua avaliação caso não seja feito.

Serão considerados extras:

- Código bem documentado;
- Documentação gerada no codigo da API, por ex com ApiDoc;
- Código com funções e variáveis em ingles (PS: Documentação pode ser em portugues ou ingles);


<br>


## :rocket: Para a entrega do seu desafio.

- Faça um fork deste projeto em sua conta no [Github](https://github.com/join).
- Crie um repositório *privado*, com a solução do seu desafio. 
- Em seguida, desenvolva o projeto. 
- Adicione como membro do repositório o usuario  @DiegoCarriao.
- Por fim, envie um email informando que concluiu o desafio para diego.carriao@shsquads.com

<br> 

*Muito obrigado Padawan por fazer parte da nossa equipe, agredecemos a sua participação, e que a força estejá com você*

<br>

https://www.shsquads.com

<br>

<a target='_blank'><img align="right" class='header-img' width=230px height=250px src='https://user-images.githubusercontent.com/54849358/78149611-90715f00-740c-11ea-8d21-4654691dca88.png' /></a>

<br>

## Initial challenge

> Clone the project:
```bash
$ git clone https://github.com/claubraine/challenge-backend.git
```
> node.js version:
```bash
v16.13.1
```
> Download updated version
https://nodejs.org

## Installing project dependencies
> Inside the project folder:
```bash
$ npm install
```

## Configuring Mailgun
> You can use your settings, or use the configuration below, it allows sending to the account 'claubraine@yahoo.com.br'
Edit the .env file
```bash
API_KEY=e9f780e2374df57c751f1193db0c0f6a-8ed21946-284cd488
DOMAIN=sandboxa181135390e44fd2873eca91e33900dd.mailgun.org
```

## Database
> You can use your settings, or use the setting below
> Setting up Postgresql database:
Edit the .env file
```bash
POSTGRES_HOST=ec2-54-160-96-70.compute-1.amazonaws.com
POSTGRES_PORT=5432
POSTGRES_USER=dyyserxaqaenqn
POSTGRES_PASSWORD=3acc53ea009d9976e998bb163abc368bfaee82fac287810473fb81598fd84ae0
POSTGRES_DB=d3v4uq505jqg87
```
> Edit the ormconfig.json file
```bash
    {
      "skip": true,
      "name": "default",
      "type": "postgres",
      "host": "ec2-54-160-96-70.compute-1.amazonaws.com",
      "port": 5432,
      "username": "dyyserxaqaenqn",
      "password": "3acc53ea009d9976e998bb163abc368bfaee82fac287810473fb81598fd84ae0",
      "database": "d3v4uq505jqg87",
      "extra": {
        "ssl": {
          "rejectUnauthorized": false
        }
      },
      "entities": [
        "./src/models/postgresql/**/*.ts"
      ],
      "migrations": [
        "./src/migrations/postgresql/*.ts"
      ],
      "cli": {
        "migrationsDir": "./src/migrations/postgresql/"
      }
    },
```
> Generate migration:

```bash
$ yarn typeorm migration:generate -n migration
```

> run migration: 

```bash
$ yarn typeorm migration:run
```
## Running the project
> The Command below updates the swagger file, generates the files in the build folder and puts the project into execution
```bash
$ npm run producao
```
Optional commands
</br>
> updates the swagger file
```bash
$ npm run autogen-swagger
```
> Generates the files in the build folder
```bash
npm run build
```
## Codebase Structure

```bash
< ROOT / src >
     |
     build                                  # Folder where the build files will be
     | 
     |-- config/                              
     |    |-- config.ts                     # Configuration       
     |    |-- passport.ts                   # Defines Passport Strategy    
     |    |-- safeRoutes.ts                 # Defines access
     |
     |-- controllers/                              
     |    |-- mensageria-controller.ts      # Defines shipping procedures       
     |    |-- users-controller.ts           # Defines user proceduresy    
     |-- migration/postgresql
     |    |-- some_migration.ts             # Database migrations
     |
     |-- models/postgresql                              
     |    |-- activeSession.ts              # Sessions Model (Typeorm)              
     |    |-- user.ts                       # User Model (Typeorm) 
     | 
     |-- routes/
     |    |-- index.ts                      # Defines API Routes
     |    |-- mensageria.routes.ts          # Defines Mensageria API Routes
     |    |-- service.routes.ts             # Defines Service API Routes
     |    |-- users.routes.ts               # Defines Users API Routes
     |
     |-- service/
     |    |-- database_postgresql.ts        # Defines database access settings
     |    |-- database_postgresql_conf.ts   # Defines database access settings
     | 
     | 
     |-- index.js                           # API Entry Point
     |
     files                                  # Attached files
     |-- API-NODEJS.postman_collection.json # File Integration API postman
     |
     .env                                   # Specify the ENV variables
     ormconfig.json                         # Defines ormconfig
     package.json                           # Defines package
     swagger.js                             # Defines swagger
     |                        
     |-- ************************************************************************
```

<br />

## API

> Postman - API DOCUMENTATION
```
https://github.com/claubraine/challenge-backend/blob/main/files/API-NODEJS.postman_collection.json
```
> Swagger - API DOCUMENTATION
```
http://localhost:5000/api/doc
```
## Swagger
> **Register User** - `/api/v1/user`
```
POST /api/v1/user
Content-Type: application/json
{
    "username":"teste",
    "password":"123456", 
    "email":"teste@teste.com",
    "key":"111111",
    "host":"99999"
}
```
> **Login User** - `/api/v1/user/login`
```
POST /api/v1/user/login
Content-Type: application/json
{
    "password":"pass", 
    "email":"test@appseed.us"
}
```
> **Update User** - `/api/v1/user/edit`
```
POST /api/v1/user/edit
Content-Type: application/json
x-access-token: JWT_TOKEN (returned by Login request)

```
> **Logout User** - `/api/v1/user/logout`
```
POST /api/v1/user/logout
Content-Type: application/json
x-access-token: JWT_TOKEN (returned by Login request)

{
    "token":"JWT_TOKEN"
}
```

> **Send email** - `/api/v1/mensageria/send`
```
POST /api/v1/mensageria/send
Content-Type: application/json
{
  "from": "claubraine@mail.com",
  "email": "claubraine@yahoo.com.br",
  "subject": "Assunto",
  "html": "<b>Conteudo</b>",
  "key": "111111"
}
```

> **Comments**
```
When using the API through the swagger, the 'host' value may be sent as 'http://localhost:5000/api/doc/'.
When using the API through Postman, the value 'host' may be sent as 'undefined'.
For these values, they are under development for testing purposes.
```
> **Send email - list** - `/api/v1/mensageria/send`
```
POST /api/v1/mensageria/send
Content-Type: application/json
{
  "from": "claubraine@mail.com",
  "email": "claubraine@yahoo.com.br, braine@bol.com.br",
  "subject": "Assunto",
  "html": "<b>Conteudo</b>",
  "key": "111111"
}
```
> **Send email by token** - `/api/v1/mensageria/sendbytoken`
```
POST /api/v1/mensageria/sendbytoken
Content-Type: application/json
x-access-token: JWT_TOKEN (returned by Login request)
{
  "from": "claubraine@mail.com",
  "email": "claubraine@yahoo.com.br",
  "subject": "Assunto",
  "html": "<b>Conteudo</b>",
  "key": "111111"
}
```
> **Send email by token - list** - `/api/v1/mensageria/sendbytoken`
```
POST /api/v1/mensageria/sendbytoken
Content-Type: application/json
x-access-token: JWT_TOKEN (returned by Login request)
{
  "from": "claubraine@mail.com",
  "email": "claubraine@yahoo.com.br, braine@bol.com.br",
  "subject": "Assunto",
  "html": "<b>Conteudo</b>",
  "key": "111111"
}
```
<br />



# Scripts

> "start": "pm2 start production.config.json",
</br>
> "start-node": "node build/src/index.js",
</br>
> "dev": "ts-node-dev src/index.ts",
</br>
> "build": "tsc -p tsconfig.build.json",
</br>
> "autogen-swagger": "node swagger.js",
</br>
> "producao": "npm run autogen-swagger && npm run build && npm run start-node && exit"
