/**
 * @file API client configuration shared by all backend request modules.
 * @description Creates an Axios client with the remote backend URL, timeout, and cookie-based credentials.
 */

import axios from "axios";
import { toAppError } from "@/lib/error";

/** Shared Axios client configured for the Socially backend and cookie sessions. */
const __BASE__ = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});

/**
 * Normalize transport-level Axios errors into application-level errors.
 *
 * API functions can still handle successful HTTP responses whose
 * payload contains { success: false } separately with assertApiSuccess().
 */
__BASE__.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    throw toAppError(error);
  },
);

export default __BASE__;
