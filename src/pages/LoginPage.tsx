import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Layout } from '../Layout';

type State = {
  from: {
    pathname: string;
    search: string;
    hash: string;
    state: string | null;
    key: string;
  };
};

export function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  // location.stateのfromキーを参照。
  // fromキーが空だった場合は、from.pathnameはホームページ。
  const { from } = (location.state as State) || { from: { pathname: '/' } };
  const login = () => {
    if (!auth.signin) return;
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <Layout>
      <div>
        <p>{from.pathname} のページを見るにはログインしてください。</p>
        <button onClick={login}>ログイン</button>
      </div>

      {/* デバッグ用 */}
      <div style={{ border: '1px solid black' }}>{JSON.stringify(location)}</div>
    </Layout>
  );
}
