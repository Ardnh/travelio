import { useRef, useCallback } from "react";
import type { Article } from "../../models/articles/state";
import { ChevronRight, Loader2 } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Form } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommentForm } from "./CommentForm";

type Props = {
    articles: Article[];
    hasMore: boolean;
    loading: boolean;
    fetchMore: () => void;
};

const FormSchema = z.object({
    content: z.string().min(2, {
        message: "Content must be at least 2 characters.",
    }),
})

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

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            content: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {

        console.log("submit comment")
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })
    }

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
                            <div className="pr-4">
                                <CommentForm/>
                            </div>
                            {
                                article.comments.length === 0 ?
                                    <div className="text-center w-full p-3 rounded-2xl bg-amber-100 mb-3">No Comments</div> :
                                    article.comments.map((comment) => (
                                        <div className="bg-gray-100 rounded-2xl p-4 mb-3">
                                            <div className="font-semibold mb-2">{ comment.user.username }</div>
                                            <div className="">{ comment.content}</div>
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
