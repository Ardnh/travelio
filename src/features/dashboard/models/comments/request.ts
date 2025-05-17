
export interface CreateCommentsRequest {
    data: Data
}

export interface Data {
    content: string
    article: number
}

export interface UpdateCommentRequest {
    id: string
    data: CreateCommentsRequest
}