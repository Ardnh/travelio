"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/app/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { ArticleSchema } from "../../schema/artilcle"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/app/components/ui/select"
import type { Article, DialogType } from "../../models/articles/state"
import { Fragment, useEffect, useRef, useState } from "react"
import { Loader2, Upload } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/stores"
import { createArticle, getArticleList, updateArticleById } from "../../store/articles/articlesThunks"

export type FormInputDialogProps = {
    article: Article | null,
    mode: DialogType,
    close: () => void
}

export const FormInputDialog = ({ article, mode, close, }: FormInputDialogProps) => {

    const { category } = useAppSelector((state) => state.category)
    const { loading, articlesParams } = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null)
    const [isFileChange, setIsFIleChange] = useState<boolean>(false)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof ArticleSchema>>({
        resolver: zodResolver(ArticleSchema),
        defaultValues: {
            title: "",
            description: "",
            cover_image_url: "",
            category: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof ArticleSchema>) => {

        try {
            if (previewUrl !== null) data.cover_image_url = previewUrl

            if (mode === 'Create') {
                await dispatch(createArticle({
                    data: {
                        title: data.title,
                        description: data.description ?? "",
                        cover_image_url: data.cover_image_url ?? "",
                        category: !data.category ? -1 : +data.category,
                    },
                    file: file
                })).unwrap()
            }

            if (mode === 'Edit') {
                await dispatch(updateArticleById({
                    id: article?.documentId ?? "",
                    data: {
                        title: data.title,
                        description: data.description ?? "",
                        cover_image_url: data.cover_image_url ?? "",
                        category: !data.category ? -1 : +data.category,
                    },
                    file: file
                })).unwrap()
            }

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(getArticleList(articlesParams))
        }

    }

    const handleInputClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target.files?.[0];
        if (fileInput) {
            const url = URL.createObjectURL(fileInput);
            setFile(fileInput)
            setPreviewUrl(url);
        }
    };

    useEffect(() => {
        if (mode === 'Edit') {
            form.setValue('category', article?.category?.name ?? "No category")
            form.setValue('cover_image_url', article?.cover_image_url ?? "No Image")
            form.setValue('description', article?.description ?? "No Description")
            form.setValue('title', article?.title ?? "No Title")
        }
    }, [])

    return (
        <Fragment>
            <div className="mb-3">
                {
                    form.getValues('cover_image_url') !== '' && previewUrl === null ?
                        <div className="w-full flex flex-col items-center justify-center rounded-2xl h-[13rem] relative">
                            <img
                                src={form.getValues('cover_image_url')}
                                className="absolute rounded-2xl h-[13rem] w-full object-cover"
                            />
                            <Button
                                onClick={handleInputClick}
                                variant={"outline"}
                                className="z-10"
                            >
                                <Upload /> Upload Image
                            </Button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div> : previewUrl !== null ?
                            <div className="w-full flex flex-col items-center justify-center rounded-2xl h-[13rem] relative">
                                <img
                                    src={previewUrl}
                                    className="absolute rounded-2xl h-[13rem] w-full object-cover"
                                />
                                <Button
                                    onClick={handleInputClick}
                                    variant={"outline"}
                                    className="z-10"
                                >
                                    <Upload /> Upload Image
                                </Button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    hidden
                                />
                            </div> :
                            <div className="w-full flex flex-col items-center justify-center rounded-2xl h-[13rem] bg-gray-50">
                                <Button onClick={handleInputClick} variant={"outline"}>
                                    <Upload /> Upload Image
                                </Button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    hidden
                                />
                            </div>
                }
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Fruits</SelectLabel>
                                                {
                                                    category.map((item) => <SelectItem key={item.documentId} value={`${item.id}`}>{item.name}</SelectItem>)
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-2">
                        <Button onClick={close} type="button" variant="secondary">Cancel</Button>
                        <Button type="submit" disabled={loading.createArticleIsLoading}>
                            {(loading.createArticleIsLoading || loading.updateArticleIsLoading) && <Loader2 className="animate-spin" />} Save
                        </Button>
                    </div>
                </form>
            </Form>
        </Fragment>
    )
}
