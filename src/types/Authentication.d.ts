import type { User } from "./Users";

export interface Session {
  user: User;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
