import axios from "axios";
import { UI_STRINGS } from "@/constants";

/**
 * Application-level error used throughout the frontend.
 *
 * All API, network, timeout, and unknown errors are normalized
 * into this type before reaching the UI.
 */
export class AppError extends Error {
  readonly status?: number;
  readonly code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);

    this.name = "AppError";
    this.status = status;
    this.code = code;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Converts an unknown thrown value into a user-readable error message.
 */
export function getErrorMessage(
  error: unknown,
  fallback: string = UI_STRINGS.errors.generic,
): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message;

    if (typeof responseMessage === "string" && responseMessage.trim()) {
      return responseMessage;
    }

    if (error.code === "ECONNABORTED") {
      return UI_STRINGS.errors.timeout;
    }

    if (!error.response) {
      return UI_STRINGS.errors.network;
    }

    if (error.response.status >= 500) {
      return UI_STRINGS.errors.server;
    }

    return error.message || fallback;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return fallback;
}

/**
 * Converts an unknown error into an AppError.
 */
export function toAppError(
  error: unknown,
  fallback: string = UI_STRINGS.errors.generic,
): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const code = error.code;

    return new AppError(getErrorMessage(error, fallback), status, code);
  }

  return new AppError(getErrorMessage(error, fallback));
}

/**
 * Throws an AppError when an API response indicates failure.
 *
 * This handles application-level errors represented by
 * { success: false, message } responses.
 */
export function assertApiSuccess<
  T extends { success: boolean; message?: string },
>(
  response: T,
  fallback: string = UI_STRINGS.errors.requestFailed,
): asserts response is T & { success: true } {
  if (!response.success) {
    throw new AppError(response.message?.trim() || fallback);
  }
}
