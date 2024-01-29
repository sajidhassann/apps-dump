'use client';

import { Provider } from 'react-redux';
import { ReactNode, useEffect } from 'react';
import store from '../redux';
import { loadConfig } from '../configs';

export function ReduxProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    loadConfig();
  }, []);
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
