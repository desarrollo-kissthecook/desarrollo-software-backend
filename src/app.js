const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const koaStatic = require('koa-static');
const override = require('koa-override-method');
const orm = require('./models');
const server = require('./apollo');

// App constructor
const app = new Koa();

// const developmentMode = app.env === 'development';

app.keys = [
  'these secret keys are used to sign HTTP cookies',
  'to make sure only this app can generate a valid one',
  'and thus preventing someone just writing a cookie',
  'saying he is logged in when it\'s really not', // eslint-disable-line
];

// expose ORM through context's prototype
app.context.orm = orm;

/**
 * Middlewares
 */

// expose running mode in ctx.state
app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  return next();
});

// log requests
app.use(koaLogger());

app.use(koaStatic(path.join(__dirname, '..', 'build'), {}));

// parse request body
app.use(
  koaBody({
    multipart: true,
    keepExtensions: true,
  })
);

app.use((ctx, next) => {
  ctx.request.method = override.call(
    ctx,
    ctx.request.body.fields || ctx.request.body
  );
  return next();
});

server.applyMiddleware({ app });

module.exports = app;
