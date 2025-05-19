import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/global/AppSidebar";
import { useAppSelector } from "../stores";

const DashboardLayout = () => {

    const { currentPage } = useAppSelector((state) => state.dashboard)

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="w-full h-[3rem] flex items-center justify-start px-5">
                    <SidebarTrigger />
                    <div className="ml-5">{currentPage}</div>
                </div>
                <div className="p-5">
                    <Outlet/>
                </div>
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout