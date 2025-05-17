import { Fragment } from "react/jsx-runtime"
import { useArticle } from "../hooks/useArticle"
import { AppWindowMac, Layers2, MessageCircle, NotepadText, Table } from "lucide-react"
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/app/components/ui/table"
import ArticleTable from "../components/ArticleTable"

const ArticlesPage = () => {

    const { articles } = useArticle()

    return (
        <Fragment>
            <div className="size-full">
                <div className="">
                    <div className="text-2xl font-semibold">Overview</div>
                    <div className="">This is the page where your article is summarized.</div>
                </div>

                <div className="grid grid-cols-4 mt-4 gap-3">
                    <div className="h-[9rem] bg-amber-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2"><NotepadText /> Article</div>
                    </div>
                    <div className="h-[9rem] bg-emerald-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2"><MessageCircle /> Comments</div>
                    </div>
                    <div className="h-[9rem] bg-cyan-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2"><Layers2 /> Categories</div>
                    </div>
                    <div className="h-[9rem] bg-gray-50 flex flex-col justify-center rounded-2xl p-4">
                        <div className="text-3xl font-semibold">Travelio.</div>
                        <div className="text-gray-400">Article management</div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-2xl mt-3 h-full w-full p-4">
                    <ArticleTable></ArticleTable>
                </div>

            </div>
        </Fragment>
    )
}

export default ArticlesPage