import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home, NotFound, Notifications, Profile } from ".";

const route = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/notifications", Component: Notifications },
  { path: "/profile/:username", Component: Profile },
  { path: "*", Component: NotFound },
]);

export default function Root() {
  return (
    <div>
      <span>navbar</span>
      <RouterProvider router={route} />
    </div>
  );
}
