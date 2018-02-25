import React from 'react';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/header/Header';
import './main.scss';
import SvgImage from './images/svgimage.svg';
import Category from './pages/category';
import CategoryCreate from './pages/category_create';
import ProductCreate from './pages/product_create';
import store from './reducers/store';

const client = new ApolloClient({
  link: new HttpLink({}),
  cache: new InMemoryCache(),
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className="app-container">
          <Header />
          <img alt="bbb" style={{ width: '50px' }} src={SvgImage} />
          <Route exact path="/" component={Category} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/category/:id" component={Category} />
          <Route
            exact
            path="/category/:id/create_category"
            component={CategoryCreate}
          />
          <Route
            exact
            path="/category/:id/create_product"
            component={ProductCreate}
          />
        </div>
      </Provider>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
