import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home, Layout, NotFound, Notifications, Profile } from "./layout";

const route = createBrowserRouter([
  {
    Component: Layout,
    children:[
      { path: "/", Component: Home },
      { path: "/notifications", Component: Notifications },
      { path: "/profile/:username", Component: Profile },
      { path: "*", Component: NotFound },
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
);

