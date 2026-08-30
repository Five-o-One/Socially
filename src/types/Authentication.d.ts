/** @file Authentication requests, session data, and auth response contracts. */
import type { User } from "./Users";

/** Server session metadata for the authenticated user. */
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

/** Current-session response containing session and user data. */
export interface Session {
  message: string;
  success: boolean;
  data: {
    session: SessionData;
    user: User;
  };
}

/** Response returned by login and registration operations. */
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

/** Credentials submitted to the login endpoint. */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Values submitted to the registration endpoint. */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
