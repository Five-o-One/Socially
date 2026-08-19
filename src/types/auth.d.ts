import type { User } from "./user";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  username?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthSessionResponse {
  user: User | null;
  isAuthenticated: boolean;
}
