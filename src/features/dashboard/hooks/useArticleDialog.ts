import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ArticleSchema } from "../schema/artilcle";

export const useArticleDialog = () => {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const articleForm = useForm<z.infer<typeof ArticleSchema>>({
        resolver: zodResolver(ArticleSchema),
        defaultValues: {
            title: "",
            description: "",
            cover_image_url: "",
            category: ""
        }
    });

    const onCreateArticle = async (values: z.infer<typeof ArticleSchema>) => {
        try {
            console.log("create values")
            console.log(values)
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    const onUpdateArticle = async () => {

    }

    const handleInputClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    return {
        fileInputRef,
        previewUrl,
        articleForm,
        handleInputClick,
        handleFileChange,
        onCreateArticle
    }
}