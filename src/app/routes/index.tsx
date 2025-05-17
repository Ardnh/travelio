import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "@/app/layouts/HomeLayout";
import AuthenticationLayout from "@/app/layouts/AuthenticationLayout";
import RequireAuth from "../components/guard/RequireAuth";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "@/features/home/pages/Home"
import Auth from "@/features/auth/pages/Auth";
import Overview from "@/features/dashboard/pages/Overview";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout/>,
        children: [
            {
                path: '',
                element: <Home/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthenticationLayout/>,
        children: [
            {
                path: '',
                element: <Auth/>
            }
        ]
    },
        {
        path: '/dashboard',
        element: (
            <RequireAuth>
                <DashboardLayout/>
            </RequireAuth>
        ),
        children: [
            {
                path: '',
                element: <Overview/>
            }
        ]
    },
])

export default router