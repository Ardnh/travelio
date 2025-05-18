export interface CreateCategoryRequest {
  data: Data
}

export interface Data {
  name: string
  description: string
}

export interface UpdateCategoryRequest {
    id: string
    data: CreateCategoryRequest
}