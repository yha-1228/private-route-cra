import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PrivateRoute({ children, ...rest }: RouteProps & { children: React.ReactNode }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      // 引数のlocationはリダイレクト前にアクセスしたページのパス

      // レンダーするもの:
      // ユーザーありならprops.chidrenを出力
      // ユーザーなしならログインページにリダイレクト

      // to propsのstate keyは
      // リダイレクト先で以下のように取り出せる
      // -----------------------
      // const location = useLocation();
      // => location.state
      render={({ location }) =>
        auth.user ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  );
}
