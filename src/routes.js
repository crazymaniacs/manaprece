import App from './App';
import About from './About';
import Home from './Home';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/about',
        component: About
      }
    ]
  }
];

export default routes;
