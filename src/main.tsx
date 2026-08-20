import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "@/layout/Layout";
import {
  HomePage,
  NotificationsPage,
  ProfilePage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
} from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "notifications", Component: NotificationsPage },
      { path: "profile/:username", Component: ProfilePage },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
