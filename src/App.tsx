import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  RouteProps,
} from 'react-router-dom';
import { ProvideAuth } from './auth/ProvideAuth';
import { useAuth } from './hooks/useAuth';

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <ul>
            <li>
              <Link to="/public">パブリックページ</Link>
            </li>
            <li>
              <Link to="/protected">会員専用ページ</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

function AuthButton() {
  const history = useHistory();
  const auth = useAuth();

  return auth.user ? (
    <p>
      ようこそ!{' '}
      <button
        onClick={() => {
          if (!auth.signout) return;
          auth.signout(() => history.push('/'));
        }}
      >
        ログアウト
      </button>
    </p>
  ) : (
    <p>ログインしていません。</p>
  );
}

function PrivateRoute({ children, ...rest }: RouteProps & { children: React.ReactNode }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  );
}

function PublicPage() {
  return <h3>パブリック</h3>;
}

function ProtectedPage() {
  return <h3>会員専用</h3>;
}

function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const { from } = (location.state as { from: any }) || { from: { pathname: '/' } };
  const login = () => {
    if (!auth.signin) return;
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>{from.pathname} のページを見るにはログインしてください。</p>
      <button onClick={login}>ログイン</button>
    </div>
  );
}
