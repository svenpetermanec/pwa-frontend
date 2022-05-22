import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import {
  RegisterUserResponse,
  RegisterUserRequest,
  LoginUserResponse,
  LoginUserRequest,
} from 'redux/models/authModel';
import { registerUser, loginUser } from 'redux/services/auth.service';

export const registerUserThunk: AsyncThunk<
  RegisterUserResponse,
  RegisterUserRequest,
  {}
> = createAsyncThunk<RegisterUserResponse, RegisterUserRequest>(
  'auth/register',
  async (request, thunkApi) => {
    const response = await registerUser(request);
    return response.data;
  }
);

export const loginUserThunk: AsyncThunk<
  LoginUserResponse,
  LoginUserRequest,
  {}
> = createAsyncThunk<LoginUserResponse, LoginUserRequest>(
  'auth/login',
  async (request, thunkApi) => {
    const response = await loginUser(request);
    return response.data;
  }
);
