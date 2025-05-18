import type { Category } from "../categories/state"

export interface Article {
    id: number
    documentId: string
    title: string
    description: string
    cover_image_url: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: any
    comments: Comment[]
    category: Category | null
}

export interface Comment {
    id: number
    documentId: string
    content: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: any
    user: User
}

export interface User {
    id: number
    documentId: string
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: any
}

export interface Meta {
    pagination: Pagination
}

export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

export interface ArticleParams {
    page: number
    pageSize: number
    populateCommentPopulateUser: boolean
    populateUser: boolean
    populateCategory: boolean
    filterTitle: string
    filterCategoryName: string
    populate: boolean
}

export type DialogType = 'View' | 'Edit' | 'Create' | null

export interface ArticleInitialState {
    articles: Article[],
    articlesParams: ArticleParams,
    showDialog: {
        type: DialogType,
        data: Article | null
    }
    loading: {
        getListArticleIsLoading: boolean
        getArticleByIdIsLoading: boolean
        updateArticleIsLoading: boolean
        createArticleIsLoading: boolean
        deleteArticleIsLoading: boolean
    }
}