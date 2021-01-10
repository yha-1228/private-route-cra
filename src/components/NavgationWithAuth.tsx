import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function NavgationWithAuth() {
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
