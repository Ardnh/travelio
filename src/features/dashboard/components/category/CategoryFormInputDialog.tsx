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
import type { Category } from "../../models/categories/state"
import type { CategoryDialogType } from "../../constant/stateCategory"
import { CategorySchema } from "../../schema/category"
import { createCategory, getCategoryList, updateCategoryById } from "../../store/category/categoryThunk"

export type FormCategoryInputDialogProps = {
    categoryItem: Category | null,
    mode: CategoryDialogType,
    close: () => void
}

export const FormCategoryInputDialog = ({ categoryItem, mode, close, }: FormCategoryInputDialogProps) => {

    const { category } = useAppSelector((state) => state.category)
    const { loading } = useAppSelector((state) => state.category)
    const dispatch = useAppDispatch()

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null)

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof CategorySchema>) => {

        try {

            if (mode === 'Create') {
                await dispatch(createCategory({
                    data: {
                        name: data.name,
                        description: data.description ?? "",
                    },
                })).unwrap()
            }

            if (mode === 'Edit') {
                await dispatch(updateCategoryById({
                    id: categoryItem?.documentId ?? "",
                    data: {
                        data : {
                            name: data.name,
                            description: data.description ?? "",
                        }
                    },
                })).unwrap()
            }

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(getCategoryList())
        }

    }

    useEffect(() => {
        if (mode === 'Edit') {
            form.setValue('description', categoryItem?.description ?? "No Description")
            form.setValue('name', categoryItem?.name ?? "No Title")
        }
    }, [])

    return (
        <Fragment>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
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
                    <div className="flex justify-end gap-2">
                        <Button onClick={close} type="button" variant="secondary">Cancel</Button>
                        <Button type="submit" disabled={loading.createCategoryIsLoading || loading.updateCategoryIsLoading}>
                            {(loading.createCategoryIsLoading || loading.updateCategoryIsLoading) && <Loader2 className="animate-spin" />} Save
                        </Button>
                    </div>
                </form>
            </Form>
        </Fragment>
    )
}

