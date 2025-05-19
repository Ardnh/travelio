import { useRef, useCallback } from "react";
import type { Article } from "../../models/articles/state";
import { Loader2 } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";
import { CommentForm } from "./CommentForm";

type Props = {
    articles: Article[];
    hasMore: boolean;
    loading: boolean;
    fetchMore: () => void;
};

const ArticlesList = ({ articles, hasMore, loading, fetchMore }: Props) => {

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
        <div className="space-y-4">
            {
                articles.map((article, index) => {
                    const isLast = index === articles.length - 1;
                    return (
                        <div
                            key={index}
                            ref={isLast ? lastElementRef : null}
                            className="p-4 rounded-2xl"
                        >
                            <img src={article.cover_image_url} className="w-full h-[20rem] rounded-2xl object-cover" />
                            <div className="my-4 text-2xl font-semibold">{article.title ?? ""}</div>
                            <div className="mb-2">{article.description ?? ""}</div>
                            <div className="mb-2 mt-2 font-semibold">Comments {`(${article.comments.length})`}</div>
                            <div className="pr-4">
                                <CommentForm article={article} index={index}/>
                            </div>
                            {
                                article.comments.length === 0 ?
                                    <div className="text-center w-full p-3 rounded-2xl bg-amber-100 mb-3">No Comments</div> :
                                    article.comments.map((comment, index) => (
                                        <div key={index} className="bg-gray-100 rounded-2xl p-4 mb-3">
                                            <div className="font-semibold mb-2">{comment.user.username}</div>
                                            <div className="">{comment.content}</div>
                                        </div>
                                    ))
                            }
                            <Separator className="text-center" />
                        </div>
                    );
                })
            }
            <div className="flex justify-center items-center h-[20rem]">
                {loading && <div className="flex justify-center items-center"><Loader2 className="animate-spin mr-3" /> Load article...</div>}
            </div>
        </div>
    );
};

export default ArticlesList;
