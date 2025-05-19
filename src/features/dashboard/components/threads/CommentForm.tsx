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
import { Send } from "lucide-react"

const FormSchema = z.object({
    content: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function CommentForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            content: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
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
                                    <Button type="submit">
                                        <Send />
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
