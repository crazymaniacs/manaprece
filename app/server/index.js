const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use(express.static(path.join('build', 'public')));
app.use('/graphql', graphqlHTTP({schema, graphiql: true}));

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port);
});
