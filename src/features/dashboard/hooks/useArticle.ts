import { useAppDispatch, useAppSelector } from "@/app/stores"
import { useCallback, useEffect, useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { getArticleList } from "@/features/dashboard/store/articles/articlesThunks"
import { type SortingState, type ColumnFiltersState, type VisibilityState, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table"
import { columns } from "../constant/table"
import { ArticleSchema } from "../schema/artilcle"
import { z } from "zod"
import { getCategoryList } from "../store/category/categoryThunk"
import { useSelector } from "react-redux"
import { getArticleSummary } from "../store/articles/articleSelector"
import debounce from "lodash.debounce";


export const useArticle = () => {

    // Instance
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading, articles, articlesParams } = useAppSelector((state) => state.article)
    const { category } = useAppSelector((state) => state.category)
    const articlesSummary = useSelector(getArticleSummary)

    // State
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data: articles,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const onCreateArticle = async (values: z.infer<typeof ArticleSchema>) => {
        try {
            console.log("create values")
            console.log(values)
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    useEffect(() => {
        document.title = 'Articles | Travelio.'
        dispatch(getArticleList(articlesParams))
        dispatch(getCategoryList())
    }, [])

    return {
        loading,
        articles,
        table,
        columnsLength: columns.length,
        articlesSummary,
        totalCategory: category.length,
        onCreateArticle,
    }
}