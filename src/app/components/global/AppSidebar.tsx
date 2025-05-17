import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/app/components/ui/sidebar"
import { items } from "@/app/constants/sidebar-item"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { ArrowLeftFromLine } from "lucide-react"
export const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader>
                    <div className="w-full h-[5rem] flex items-center justify-center font-semibold text-[3rem] rounded-xl">Travelio.</div>
                </SidebarHeader>
                <SidebarGroup className="h-full">
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
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
                    <Button>
                        <ArrowLeftFromLine /> Logout
                    </Button>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
