import { useState } from 'react';
import { fakeAuth } from '../auth/fakeAuth';

export function useProvideAuth() {
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
