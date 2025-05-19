import ArticlesList from "../components/threads/ArticleList";
import { useThread } from "../hooks/useThreads";

const ThreadPage = () => {

    const { loading, articles, hasMore, fetchMore, } = useThread()

    return (
        <div className="max-w-xl h-[45rem] mx-auto overflow-y-scroll">
            <ArticlesList
                articles={articles}
                hasMore={hasMore}
                loading={loading.getArticleIsLoading}
                fetchMore={fetchMore}
            />
        </div>
    );
}

export default ThreadPage