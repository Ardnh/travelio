import { Fragment } from "react/jsx-runtime"
import { useArticle } from "../hooks/useArticle"
import { Layers2, MessageCircle, NotepadText, Upload } from "lucide-react"
import ArticleTable from "../components/articles/ArticleTable"
import { ArticleRowActions } from "../components/articles/ArticleDialog"
import styles from '@/features/dashboard/styles/articles.module.css'
import { Toaster } from "sonner"
import { ViewArticle } from "../components/articles/ViewArticle"

const ArticlesPage = () => {

    const {
        articles,
        articlesSummary,
        totalCategory,
    } = useArticle()

    return (
        <Fragment>
            <Toaster/>
            <div className="size-full">
                <div className="">
                    <div className="text-2xl font-semibold">Overview</div>
                    <div className="">This is the page where your article is summarized.</div>
                </div>

                <div className="grid grid-cols-4 mt-4 gap-3">
                    <div className="h-[9rem] bg-amber-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2"><NotepadText /> Article</div>
                        <div className="font-semibold text-5xl mt-5 text-center">{articlesSummary.totalArticle}</div>
                    </div>
                    <div className="h-[9rem] bg-emerald-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2"><MessageCircle /> Comments</div>
                        <div className="font-semibold text-5xl mt-5 text-center">{articlesSummary.totalComments}</div>
                    </div>
                    <div className="h-[9rem] bg-cyan-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2"><Layers2 /> Categories</div>
                        <div className="font-semibold text-5xl mt-5 text-center">{totalCategory}</div>
                    </div>
                    <div 
                        className={`h-[9rem] bg-gray-50 flex flex-col justify-center rounded-2xl p-4 ${styles.gradient}`} 
                    >
                        <div className="text-3xl font-semibold">Travelio.</div>
                        <div className="text-gray-500">Article management</div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-2xl mt-3 h-full w-full p-4">
                    <ArticleTable articles={articles}></ArticleTable>
                </div>
            </div>
            <ArticleRowActions/>
            <ViewArticle/>
        </Fragment>
    )
}

export default ArticlesPage

