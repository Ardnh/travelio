import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, SquareKanban, PenLine, Trash2 } from "lucide-react"
import type { Article, User } from "../models/articles/state"
import type { Category } from "../models/categories/state"

export const columns : ColumnDef<Article>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="capitalize truncate">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "comments",
        header: "Comments",
        cell: ({ row }) => {
            const comment = row.getValue("comments") as Comment[]
            return (
                <div className="capitalize">{ comment.length }</div>
            )
        }
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.getValue("category") as Category
            return (
                <div className="capitalize">{ category && category.name !== null ? category.name : 'No category' }</div>
            )
        }
    },
    {
        accessorKey: "user",
        header: "Username",
        cell: ({ row }) => {
            const user = row.getValue("user") as User
            return (
                <div className="capitalize">{ user.username }</div>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const user = row.getValue("user") as User
            return (
                <div className="capitalize">{ user.email }</div>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const article = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><SquareKanban /> View Article</DropdownMenuItem>
                        <DropdownMenuItem><PenLine className="text-violet-400"/> Edit Article</DropdownMenuItem>
                        <DropdownMenuItem><Trash2 className="text-red-400"/> Delete Article</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]