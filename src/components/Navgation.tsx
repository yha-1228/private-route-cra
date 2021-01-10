import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
            <li style={{ display: 'inline-block', paddingRight: 8 }}>
              <NavLink activeStyle={{ fontWeight: 'bold' }} to="/" exact>
                ホーム
              </NavLink>
            </li>
            <li style={{ display: 'inline-block', paddingRight: 8 }}>
              <NavLink activeStyle={{ fontWeight: 'bold' }} to="/public">
                パブリック
              </NavLink>
            </li>
            <li style={{ display: 'inline-block', paddingRight: 8 }}>
              <NavLink activeStyle={{ fontWeight: 'bold' }} to="/public2">
                パブリック2
              </NavLink>
            </li>
            <li style={{ display: 'inline-block', paddingRight: 8 }}>
              <NavLink activeStyle={{ fontWeight: 'bold' }} to="/protected">
                会員専用
              </NavLink>
            </li>
            <li style={{ display: 'inline-block', paddingRight: 8 }}>
              <NavLink activeStyle={{ fontWeight: 'bold' }} to="/protected2">
                会員専用2
              </NavLink>
            </li>
          </ul>
        </nav>

        {renderIsUser()}
      </div>
    </div>
  );
}
