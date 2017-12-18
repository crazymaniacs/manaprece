const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
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
