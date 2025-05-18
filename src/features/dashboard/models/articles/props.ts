import type { Article } from "./state"

export type TableProps = {
    articles: Article[]
}

export type ArticleActionDialogProps = {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputClick: () => void,
    imagePreview: string | null
    fileInputRef: React.RefObject<HTMLInputElement | null>
};
