/**
 * @file API client configuration shared by all backend request modules.
 * @description Creates an Axios client with the remote backend URL, timeout, and cookie-based credentials.
 */
import axios from "axios";

/** Shared Axios client configured for the Socially backend and cookie sessions. */
const __BASE__ = axios.create({
  baseURL: "https://socially-nextjs-six.vercel.app",
  timeout: 5000,
  withCredentials: true,
});

export default __BASE__;
