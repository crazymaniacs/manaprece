import merge from 'lodash/merge';

import defaultConfig from './configuration.defaults';
import developmentConfig from './configuration.development';
import productionConfig from './configuration.production';

const configuration = merge({}, defaultConfig);

if (process.env.NODE_ENV === 'production') {
  merge(configuration, productionConfig);
} else {
  merge(configuration, developmentConfig);
}

// For services like Amazon Elastic Compute Cloud and Heroku
if (process.env.PORT) {
  configuration.web.port = process.env.PORT;
}

// For passing custom configuration via an environment variable.
// For frameworks like Docker.
// E.g. `CONFIGURATION="{ \"key\": \"value\" }" npm start`.
if (process.env.CONFIGURATION) {
  try {
    merge(configuration, JSON.parse(process.env.CONFIGURATION));
  } catch (error) {
    console.error(error);
  }
}

export default configuration;
