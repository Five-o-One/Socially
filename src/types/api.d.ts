/** Successful API response envelope containing typed data. */
export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

/** Failed API response envelope containing an error message. */
export interface ApiError {
  success: false;
  message: string;
}

/** Union of successful and failed API response envelopes. */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/** API response containing only success status and a message. */
export interface ApiMessageResponse {
  success: boolean;
  message: string;
}
