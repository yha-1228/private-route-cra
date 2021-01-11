import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const routes = [
  { to: '/', exact: true, title: 'ホーム' },
  { to: '/public', exact: false, title: 'パブリック' },
  { to: '/protected', exact: false, title: '会員専用' },
];

export function Navgation() {
  const history = useHistory();
  const auth = useAuth();

  const renderIsUser = () => {
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
  };

  return (
    <div style={{ border: '1px solid black', padding: 8 }}>
      <div style={{ display: 'flex' }}>
        <nav>
          <ul>
            {routes.map((route, i) => (
              <li key={i} style={{ display: 'inline-block', paddingRight: 8 }}>
                <NavLink activeStyle={{ fontWeight: 'bold' }} to={route.to} exact={route.exact}>
                  {route.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {renderIsUser()}
      </div>
    </div>
  );
}
