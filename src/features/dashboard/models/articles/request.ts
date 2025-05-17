export interface CreateArticleRequest {
    data: Data
}

export interface Data {
    title: string
    description: string
    cover_image_url: string
    category: number
}

export interface UpdateArticleRequest {
    id: string,
    data: CreateArticleRequest
}