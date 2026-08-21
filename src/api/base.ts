import axios from "axios";

const __BASE__ = axios.create({
  baseURL: "https://socially-nextjs-six.vercel.app",
  timeout: 5000,
  withCredentials: true,
});

export default __BASE__;
