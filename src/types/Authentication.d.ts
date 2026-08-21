import type { User } from "./Users";

export interface SessionData {
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
  id: string;
}

export interface Session {
  message: string;
  success: boolean;
  data: {
    session: SessionData;
    user: User;
  };
}

export interface AuthResponse {
  message: string;
  success: boolean;
  data: {
    redirect?: boolean;
    token: string;
    url?: string;
    user: User;
  };
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
