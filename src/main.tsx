/**
 * @file Application entry point.
 * @description Defines the route tree and mounts the React provider hierarchy.
 */
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
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ThemeManager } from "@/components";

/**
 * @description Application route tree consumed by `RouterProvider`.
 * @route / - Feed rendered inside the shared `Layout`
 * @route /notifications - Authenticated notifications page
 * @route /profile/:username - Profile page resolved by username
 * @route /profile/id/:id - Profile page resolved by user ID
 * @route /login - Login page
 * @route /register - Registration page
 * @route * - Not-found fallback
 */
const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "notifications", Component: NotificationsPage },
      { path: "profile/:username", Component: ProfilePage },
      { path: "profile/id/:id", Component: ProfilePage },
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

/**
 * @description Mounts the React application with strict mode, query caching,
 * theme synchronization, and routing providers.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeManager />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
