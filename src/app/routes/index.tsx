import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "@/app/layouts/HomeLayout";
import AuthenticationLayout from "@/app/layouts/AuthenticationLayout";
import RequireAuth from "../components/guard/RequireAuth";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "@/features/home/pages/HomePage"
import AuthPage from "@/features/auth/pages/AuthPage";
import OverviewPage from "@/features/dashboard/pages/OverviewPage";
import ArticlesPage from "@/features/dashboard/pages/ArticlesPage";
import CategoryPage from "@/features/dashboard/pages/CategoryPage";
import ThreadPage from "@/features/dashboard/pages/ThreadPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthenticationLayout/>,
        children: [
            {
                path: '',
                element: <AuthPage/>
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
                element: <OverviewPage/>
            },
            {
                path: '/dashboard/thread',
                element: <ThreadPage/>
            },
            {
                path: '/dashboard/articles',
                element: <ArticlesPage/>
            },
            {
                path: '/dashboard/category',
                element: <CategoryPage/>
            }
        ]
    },
])

export default router