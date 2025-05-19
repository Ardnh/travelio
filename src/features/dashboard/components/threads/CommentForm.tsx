"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/app/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Loader2, Send } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/stores"
import { createCommentsById, getArticleThreadsList } from "../../store/threads/threadsThunk"
import type { Article } from "../../models/articles/state"
import type { CreateCommentsRequest } from "../../models/comments/request"
import { setLoading } from "../../store/threads/threadsSlice"

const FormSchema = z.object({
    content: z.string().min(2, {
        message: "Comment must be at least 2 characters.",
    }),
})

export type CommentFormProps = {
    article: Article
    index: number
}

export function CommentForm({ article, index }: CommentFormProps) {

    const dispatch = useAppDispatch()
    const { loading, articleParams } = useAppSelector((state) => state.threads)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            content: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {

        try {

            dispatch(setLoading({ actionName: 'createComment', status: true, index }))

            const req: CreateCommentsRequest = {
                data: {
                    content: data.content,
                    article: article.id
                }
            }

            await dispatch(createCommentsById(req)).unwrap()

        } catch (error) {
            console.log(error)
        } finally {
            form.setValue('content', "")
            dispatch(setLoading({ actionName: 'createComment', status: false, index }))
            await dispatch(getArticleThreadsList({
                ...articleParams,
            })).unwrap();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[35rem] space-y-6 mb-3">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex w-full items-center justify-center pr-4">
                                    <Input placeholder="comment" className="mr-2" {...field} />
                                    <Button disabled={ loading.createCommentIsLoading.status && loading.createCommentIsLoading.index === index} type="submit">
                                        { loading.createCommentIsLoading.status && loading.createCommentIsLoading.index === index ? <Loader2 className="animate-spin" /> : <Send />}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
