/**
 * @file Authentication write operations.
 * @description Provides login, registration, and logout requests.
 */
import type { AxiosResponse } from "axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../../types/Authentication";
import __BASE__ from "../base";
import type { ApiMessageResponse } from "../../types/api";

/** Authenticates a user with email and password. */
export const Login = async (
  data: LoginRequest,
): Promise<AxiosResponse<AuthResponse>> => {
  const response = await __BASE__.post<AuthResponse>(
    "/api/authentication/login",
    data,
  );

  return response;
};

/** Creates a new user account. */
export const Register = async (
  data: RegisterRequest,
): Promise<AxiosResponse<AuthResponse>> => {
  const response = await __BASE__.post<AuthResponse>(
    "/api/authentication/register",
    data,
  );

  return response;
};

/** Ends the current authenticated session. */
export const Logout = async (): Promise<AxiosResponse<ApiMessageResponse>> => {
  const response = await __BASE__.post<ApiMessageResponse>(
    "/api/authentication/logout",
  );

  return response;
};
