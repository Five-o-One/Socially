import { Outlet } from "react-router";
import { AppNavbar } from "../components";

export default function Layout() {
    return <div>
        <AppNavbar />
        <Outlet/>
    </div>
}