import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/src/models/shared/user.model';
import { AuthManager } from '@/src/services/auth';

export enum LoginStatus {
   LOGGED_IN,
   LOGGED_OUT,
   UNKNOWN,
}

export enum OnlineStatus {
   ONLINE = 'ONLINE',
   OFFLINE = 'OFFLINE',
}

export interface IAuthState {
   isLoggedIn: LoginStatus
   user?: User
   loading: boolean
}

export const defaultState: IAuthState = {
   isLoggedIn: LoginStatus.UNKNOWN,
   user: undefined,
   loading: false,
};

export const login = createAsyncThunk('login', async () => {
   try {
      await AuthManager.shared.login();
   } catch (err) {
      console.log({ err });
   }
});

export const loadUser = createAsyncThunk('load/user', async () => {
   const user = await User.loadUser();
   await user.loadUserData();
   return { user };
   // dispatch({
   // 	type: AuthActions.LOAD_USER, payload: {user}
   // })
});

export const logout = createAsyncThunk('logout', async () => {
   await AuthManager.shared.logout();
});

export const authSlice = createSlice({
   name: 'auth',
   initialState: defaultState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(login.fulfilled, () => {
         loadUser();
      });

      builder.addCase(
         loadUser.fulfilled,
         (state, action: PayloadAction<any>) => {
            const user = action?.payload?.user;
            const isLoggedIn: LoginStatus = !user
               ? LoginStatus.LOGGED_OUT
               : LoginStatus.LOGGED_IN;

            state.user = user;
            state.isLoggedIn = isLoggedIn;
         }
      );

      builder.addCase(loadUser.rejected, (state) => {
         state.user = undefined;
         state.isLoggedIn = LoginStatus.LOGGED_OUT;
      });

      builder.addCase(logout.fulfilled, (state) => {
         (state.user = undefined), (state.isLoggedIn = LoginStatus.LOGGED_OUT);
      });
   },
});
// case under reducers becomes an action
export default authSlice.reducer;
