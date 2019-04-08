# Template

Template built with [koa](http://koajs.com/) using the template made for IIC2513 - Tecnologías y Aplicaciones Web, Pontificia Universidad Católica de Chile.

## Prerequisites:
* [PostgreSQL](https://www.digitalocean.com/community/tutorials/como-instalar-y-utilizar-postgresql-en-ubuntu-16-04-es)
  * you will need a database with name and user/password as configured in `src/config/database.js`
* Install last version Node.js of with [nvm](https://github.com/creationix/nvm).
* [Yarn](https://yarnpkg.com).
* [direnv](https://github.com/direnv/direnv).

## VSCode extensions
* Babel Javascript
* ESLint
* GitLens
* GraphQl for VSCode
* npm intellisense
* Prettier - Code formatter


## Project Setup

* Clone repository
* Create a .envrc file:
  * Add variables for DB_USERNAME, DB_PASSWORD and DB_DATABASE.
  * Load the file with `direnv allow`. 
* Install dependencies:
  * `yarn install`
* 

## Database Setup

### Create development database

```sh
npx sequelize db:create
```

### Run migrations
```sh
npx sequelize db:migrate
```

### Run seeds
```sh
npx sequelize db:seed:all
```

## Run the app!

```sh
yarn start
```

or directly

```sh
node index.js
```

or, if you want automatic restart after any change in your files

```sh
./node_modules/.bin/nodemon
```

Now go to http://localhost:3000/graphql and start browsing your GraphQl server playground:)
