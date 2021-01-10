import React from 'react';
import { Navgation } from '../components/Navgation';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navgation />
      {children}
    </div>
  );
}
