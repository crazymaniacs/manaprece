const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const models = require('./models');
const mongoose = require('mongoose').set('debug', true);
const schema = require('./schema/schema');
const app = express();

const MONGO_URI =
  'mongodb://manaprece:manaprece@ds153003.mlab.com:53003/manaprece';
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', (error) => console.log('Error connecting to MongoLab:', error));

app.use(express.static(path.join(__dirname, '../dist')));
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port);
});

if (models) {
  console.log('using models to fix lint issue');
}

