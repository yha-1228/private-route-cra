import { authContext } from '../context/authContext';
import { useProvideAuth } from '../hooks/useProvideAuth';

export function ProvideAuth({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
