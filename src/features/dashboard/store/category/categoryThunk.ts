import { handleThunkRequest } from "@/app/lib/handleThunkRequest"
import type { ResponseError } from "@/app/models/HttpError"
import { api } from "@/app/services/api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { CategoryApi, } from "../../constant/url"
import type { CreateCategoryByIdResponse, GetCategoryByIdResponse, GetCategoryListResponse, UpdateCategoryByIdResponse } from "../../models/categories/response"
import type { CreateCategoryRequest, UpdateCategoryRequest } from "../../models/categories/request"

export const getCategoryList = createAsyncThunk<GetCategoryListResponse, void, { rejectValue: string | ResponseError }>('category/getCategoryList', async (_, thunkAPI) => 
    await handleThunkRequest(() => api.get(CategoryApi.GetCategoryList), thunkAPI)
)

export const getCategoryById = createAsyncThunk<GetCategoryByIdResponse, string, { rejectValue: string | ResponseError }>('category/getCategoryById', async (payload: string, thunkAPI) => 
    await handleThunkRequest(() => api.get(`${CategoryApi.GetCategoryList}/${payload}`), thunkAPI)
)

export const deleteCategoryById = createAsyncThunk<void, string, { rejectValue: string | ResponseError }>('category/deleteCategoryById', async (payload: string, thunkAPI) => 
    await handleThunkRequest(() => api.delete(`${CategoryApi.DeleteCategory}/${payload}`), thunkAPI)
)

export const updateCategoryById = createAsyncThunk<UpdateCategoryByIdResponse, UpdateCategoryRequest , { rejectValue: string | ResponseError }>('category/updateCategoryById', async (payload, thunkAPI) => 
    await handleThunkRequest(() => api.put(`${CategoryApi.UpdateCategory}/${payload.id}`, payload.data), thunkAPI)
)

export const createCategoryById = createAsyncThunk<CreateCategoryByIdResponse, CreateCategoryRequest , { rejectValue: string | ResponseError }>('category/createCategoryById', async (payload, thunkAPI) => 
    await handleThunkRequest(() => api.put(CategoryApi.CreateCategory, payload), thunkAPI)
)