import type { Meta } from "../articles/state"
import type { Category } from "./state"

export interface GetCategoryListResponse {
    data: Category[]
    meta: Meta
}

export interface GetCategoryByIdResponse extends Omit<GetCategoryListResponse, 'data'> {
    data: Category
}

export interface CreateCategoryByIdResponse extends GetCategoryByIdResponse {}
export interface UpdateCategoryByIdResponse extends GetCategoryByIdResponse {}