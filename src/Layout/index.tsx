import React from 'react';
import { Link } from 'react-router-dom';
import { NavgationWithAuth } from '../components/NavgationWithAuth';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/public">パブリックページ</Link>
          </li>
          <li>
            <Link to="/protected">会員専用ページ</Link>
          </li>
          <li>
            <Link to="/protected2">会員専用ページ2</Link>
          </li>
        </ul>
      </nav>

      <NavgationWithAuth />

      {children}
    </div>
  );
}
