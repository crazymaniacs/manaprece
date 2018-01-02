import path from 'path';
import express from 'express';
import webpack from 'webpack';
import favicon from 'serve-favicon';

import configuration from '../configuration';
import createSSR from './middleware';

export default function (parameters) {
  const app = express();

  app.use(favicon(path.join(__dirname, '..', '..', 'assets', 'favicon.ico')));
  app.get('*', createSSR(parameters.chunks()));
  app.set('port', configuration.webserver.port); //  process.env.PORT

  const server = app.listen(app.get('port'), (error) => {
    if (error) {
      console.error('Webpage rendering service was shut down due to an error');
      throw error;
    }
    console.log('listening on port ', server.address().port);
  });
}
