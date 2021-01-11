import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProvideAuth } from './auth/ProvideAuth';
import { PublicPage } from './pages/PublicPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ProtectedPage } from './pages/PtotectedPage';
import { PrivateRoute } from './routes/PrivateRoute';

const routes = [
  { path: '/', exact: true, component: <HomePage /> },
  { path: '/public', exact: false, component: <PublicPage /> },
  { path: '/login', exact: false, component: <LoginPage /> },
];

const privateRoutes = [{ path: '/protected', exact: false, component: <ProtectedPage /> }];

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} exact={route.exact}>
              {route.component}
            </Route>
          ))}
          {privateRoutes.map((privateRoute, i) => (
            <PrivateRoute key={i} path={privateRoute.path} exact={privateRoute.exact}>
              {privateRoute.component}
            </PrivateRoute>
          ))}
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
