import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Layout } from '../Layout';

export function LoginPage() {
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
    <Layout>
      <div>
        <p>{from.pathname} のページを見るにはログインしてください。</p>
        <button onClick={login}>ログイン</button>
      </div>
    </Layout>
  );
}
