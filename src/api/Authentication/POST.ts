import type { AxiosResponse } from "axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../../types/Authentication";
import __BASE__ from "../base";
import type { ApiMessageResponse } from "../../types/api";

export const Login = async (
  data: LoginRequest,
): Promise<AxiosResponse<AuthResponse>> => {
  const response = await __BASE__.post<AuthResponse>(
    "/api/authentication/login",
    data,
  );

  return response;
};

export const Register = async (
  data: RegisterRequest,
): Promise<AxiosResponse<AuthResponse>> => {
  const response = await __BASE__.post<AuthResponse>(
    "/api/authentication/register",
    data,
  );

  return response;
};

export const Logout = async (): Promise<AxiosResponse<ApiMessageResponse>> => {
  const response = await __BASE__.post<ApiMessageResponse>(
    "/api/authentication/logout",
  );

  return response;
};
