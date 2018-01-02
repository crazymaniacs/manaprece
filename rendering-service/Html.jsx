import React, { PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

export default (props) => {
  const { assets, component, store } = props;
  const content = component ? renderToString(component) : '';
  const head = Helmet.rewind();

  let data = '';

  if (store) {
    data = `
            window.__INITIAL_STATE__ =${JSON.stringify(store.getState())};
        `;
  }

  /* eslint-disable react/no-danger, react/no-array-index-key */
  return (
    <html lang="en">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />{' '}
        {process.env.NODE_ENV === 'production' &&
          Object.keys(assets.styles).map((style, key) => (
            <link
              href={assets.styles[style]}
              key={key}
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
            />
          ))}
      </head>
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: data
          }}
          charSet="UTF-8"
        />

        <script src={assets.javascript.main} charSet="UTF-8" />
      </body>
    </html>
  );
  /* eslint-disable react/no-danger, react/no-array-index-key */
};
