import { UserRole } from '@application/constants';
import { CombinedState, combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { authSlice } from '../application/redux/features/auth';
import { ferozisSlice } from '../application/redux/features/ferozis';

const middleWares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') middleWares.push(logger);

export const defaultReducers = {
  auth: authSlice.reducer,
  ferozi: ferozisSlice.reducer,
};

export const restrictedReducers: { [k: string]: unknown } = {
  [UserRole.ADMIN || UserRole.SUPER_ADMIN]: {
    auth: authSlice.reducer,
  },
  [UserRole.UNKNOWN]: {},
};

const store = configureStore({
  reducer: combineReducers(defaultReducers),
  middleware: (getMiddleware) => getMiddleware({ serializableCheck: false }).concat(middleWares),
});

export const createReducer = (asyncReducers = {}): CombinedState<object> =>
  combineReducers({
    ...defaultReducers,
    ...asyncReducers,
  });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
