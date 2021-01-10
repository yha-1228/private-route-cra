import React, { useContext, createContext, useState } from 'react';
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

const fakeAuth = {
  isAuthenticated: false,
  signin(cb: () => void) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: () => void) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */

type DefaultAuth = {
  user: string | null;
  signin: ((cb: () => void) => void) | null;
  signout: ((cb: () => void) => void) | null;
};

const defaultAuth = { user: null, signin: null, signout: null };

const authContext = createContext<DefaultAuth>(defaultAuth);

function ProvideAuth({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState<string | null>(null);

  const signin = (cb: () => void) => {
    return fakeAuth.signin(() => {
      setUser('user');
      cb();
    });
  };

  const signout = (cb: () => void) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

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

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }: RouteProps & { children: React.ReactNode }) {
  let auth = useAuth();
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
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = (location.state as { from: any }) || { from: { pathname: '/' } };
  let login = () => {
    if (!auth.signin) return;
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>{from.pathname}のページを見るにはログインしてください。</p>
      <button onClick={login}>ログイン</button>
    </div>
  );
}
