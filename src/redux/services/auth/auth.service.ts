import { LoginUserRequest, RegisterUserRequest } from 'redux/models/authModel';
import { loginRoute, registerRoute } from './auth.service.routes';
import { executeHttpPostAuthorized } from '../requests';

export const registerUser = async (params: RegisterUserRequest) => {
  return await executeHttpPostAuthorized(registerRoute, params);
};

export const loginUser = async (params: LoginUserRequest) => {
  return await executeHttpPostAuthorized(loginRoute, params);
};
