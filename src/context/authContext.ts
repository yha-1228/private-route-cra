import { createContext } from 'react';

type DefaultAuth = {
  user: string | null;
  signin: ((cb: () => void) => void) | null;
  signout: ((cb: () => void) => void) | null;
};

const defaultAuth = { user: null, signin: null, signout: null };

export const authContext = createContext<DefaultAuth>(defaultAuth);
