import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/app/components/ui/sidebar"
import { items } from "@/app/constants/sidebar-item"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { ArrowLeftFromLine, Loader2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/stores"
import { logout } from "@/features/auth/store/authThunks"
import { setCurrentPage } from "@/features/dashboard/store/dashboard/dashboardSlice"
export const AppSidebar = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading } = useAppSelector((state) => state.auth)

    const onLogout = async () => {
        await dispatch(logout()).unwrap()
        navigate('/auth')
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader>
                    <div className="w-full h-[5rem] flex items-center justify-center font-semibold text-[3rem] rounded-xl">Travelio.</div>
                </SidebarHeader>
                <SidebarGroup className="h-full">
                    <SidebarGroupLabel>Features</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild onClick={() => dispatch(setCurrentPage(item.title))}>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter>
                    <Button onClick={onLogout} disabled={ loading.logoutIsLoading }>
                        { loading.logoutIsLoading ? <Loader2 className="animate-spin"/> : <ArrowLeftFromLine />} Logout
                    </Button>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
