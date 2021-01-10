import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ProvideAuth } from './auth/ProvideAuth';
import { NavgationWithAuth } from './components/NavgationWithAuth';
import { PublicPage } from './pages/PublicPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ProtectedPage } from './pages/PtotectedPage';
import { PrivateRoute } from './routes/PrivateRoute';
import { Protected2Page } from './pages/Ptotected2Page';

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute>
          <PrivateRoute path="/protected2">
            <Protected2Page />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
