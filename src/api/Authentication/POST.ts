import type { AxiosResponse } from "axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../../types/Authentication";
import __BASE__ from "../base";

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

export const Logout = async (): Promise<AxiosResponse<void>> => {
  const response = await __BASE__.post<void>("/api/authentication/logout");

  return response;
};
