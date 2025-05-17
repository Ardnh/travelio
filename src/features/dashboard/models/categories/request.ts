export interface CreateCategoryRequest {
  data: Data
}

export interface Data {
  name: string
}

export interface UpdateCategoryRequest {
    id: string
    data: CreateCategoryRequest
}