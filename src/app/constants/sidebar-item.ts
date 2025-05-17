import { Calendar, Home, Inbox, Tent } from "lucide-react"

export const items = [
    {
        title: "Overview",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Thread",
        url: "/dashboard/thread",
        icon: Tent,
    },
    {
        title: "Articles",
        url: "/dashboard/articles",
        icon: Inbox,
    },
    {
        title: "Category",
        url: "/dashboard/category",
        icon: Calendar,
    },
]