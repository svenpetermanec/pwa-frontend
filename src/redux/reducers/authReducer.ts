import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { loginUserThunk } from 'redux/actions/authAction';
import { setLocalStorageJwt } from 'utils/localStorage';

enum LoggedInStateEnum {
  Uninitialized = 0,
  Pending = 1,
  LoggedIn = 2,
  Unauthorized = 3,
  Expired = 4,
}

interface AuthState {
  loggedInState: LoggedInStateEnum;
}

const initialState: AuthState = {
  loggedInState: LoggedInStateEnum.Uninitialized,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.rejected, (state) => {
      toast.error('Incorrect login information');
      state.loggedInState = LoggedInStateEnum.Unauthorized;
    });
    builder.addCase(loginUserThunk.pending, (state) => {
      state.loggedInState = LoggedInStateEnum.Pending;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      setLocalStorageJwt(action.payload.token);
      state.loggedInState = LoggedInStateEnum.LoggedIn;
    });
  },
});

const { reducer } = authReducer;

export default reducer;