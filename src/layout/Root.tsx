import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home, NotFound, Notifications, Profile } from ".";
import { AppNavbar } from "../components";


const route = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/notifications", Component: Notifications },
  { path: "/profile/:username", Component: Profile },
  { path: "*", Component: NotFound },
]);

export default function Root() {
  return (
    <div>
      <AppNavbar />
      <RouterProvider router={route} />
    </div>
  );
}
