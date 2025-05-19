import { Input } from "@/app/components/ui/input";
import ArticlesList from "../components/threads/ArticleList";
import { useThread } from "../hooks/useThreads";
import { Fragment } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";

const ThreadPage = () => {

    const { loading, articles, hasMore, fetchMore, onChange } = useThread()

    return (
        <Fragment>
            <div className="px-4 w-full flex justify-center mb-3">
                <div className="relative w-[20rem] md:w-[33rem]">
                    { loading.searchByFilterIsLoading && <Loader2 className="animate-spin absolute right-[0.5rem] top-[0.3rem]"/>}
                    <Input type="input" placeholder="Search article" onChange={onChange} className="w-full md:w-[33rem] pr-10" />
                </div>
            </div>
            <div className="max-w-xl h-[45rem] mx-auto overflow-y-scroll">
                <ArticlesList
                    articles={articles}
                    hasMore={hasMore}
                    loading={loading.getArticleIsLoading}
                    fetchMore={fetchMore}
                />
            </div>
        </Fragment>
    );
}

export default ThreadPage