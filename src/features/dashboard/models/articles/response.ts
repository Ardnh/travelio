import type { Article, Meta } from "./state"

export interface GetArticleListResponse {
    data: Article[]
    meta: Meta
}

export type ArticleById = Omit<Article, 'comments'>
export interface GetArticleByIdResponse {
    data: ArticleById
    meta: Meta
}
export interface CreateArticleResponse extends GetArticleByIdResponse { }
export interface UpdateArticleResponse extends GetArticleByIdResponse { }