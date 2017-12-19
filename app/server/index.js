import path from 'path';
import express from 'express';
import webpack from 'webpack';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import middleware from './middleware';

const app = express();

if (process.env.NODE_ENV === 'development') {
  const SRC_DIR = path.resolve(__dirname, 'app', 'client');
  const config = require('../../webpack.config.dev');
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    hot: true,
    inlline: true,
    publicPath: config.output.publicPath,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(express.static(SRC_DIR));
}

app.get('*', middleware);
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port);
});
