import { useRef, useCallback } from "react";
import type { Article } from "../../models/articles/state";
import { Loader2 } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";

type Props = {
    articles: Article[];
    hasMore: boolean;
    loading: boolean;
    fetchMore: () => void;
};

const ArticlesList = ({ articles, hasMore, loading, fetchMore } : Props) => {

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchMore();
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore, fetchMore]
    );

    return (
        <div className="space-y-4" >
            {
                articles.map((article, index) => {
                    const isLast = index === articles.length - 1;
                    return (
                        <div
                            key={index}
                            ref={isLast ? lastElementRef : null}
                            className="p-4 rounded-2xl bg-g"
                        >   
                            <img src={article.cover_image_url} className="w-full h-[20rem] rounded-2xl object-cover" />
                            <div className="my-4 text-2xl font-semibold">{article.title}</div>
                            <div className=" mb-2">{article.description}</div>
                            <Separator/>
                        </div>
                    );
                })
            }
            <div className="flex justify-center items-center">
                {loading && <div className="flex justify-center items-center"><Loader2 className="animate-spin mr-3" /> Load article...</div>}
            </div>
        </div>
    );
};

export default ArticlesList;
