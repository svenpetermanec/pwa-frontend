export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  token: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
}
