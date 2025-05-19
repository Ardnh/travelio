import { handleThunkRequest } from "@/app/lib/handleThunkRequest"
import type { ResponseError } from "@/app/models/HttpError"
import { api } from "@/app/services/api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { CommentsApi } from "../../constant/url"
import type { CreateCommentsRequest, UpdateCommentRequest } from "../../models/comments/request"
import type { GetCommentByIdResponse, GetCommentListResponse, UpdateCommentResponse, CreateCommentResponse } from "../../models/comments/response"

export const getCommentsList = createAsyncThunk<GetCommentListResponse, void, { rejectValue: string | ResponseError }>('comments/getCommentsList', async (_, thunkAPI) => 
    await handleThunkRequest(() => api.get(CommentsApi.GetCommentsList), thunkAPI)
)

export const getCommentsById = createAsyncThunk<GetCommentByIdResponse, string, { rejectValue: string | ResponseError }>('comments/getCommentsById', async (payload: string, thunkAPI) => 
    await handleThunkRequest(() => api.get(`${CommentsApi.GetCommentsList}/${payload}`), thunkAPI)
)

export const deleteCommentsById = createAsyncThunk<void, string, { rejectValue: string | ResponseError }>('comments/deleteCommentsById', async (payload: string, thunkAPI) => 
    await handleThunkRequest(() => api.delete(`${CommentsApi.DeleteComment}/${payload}`), thunkAPI)
)

export const updateCommentsById = createAsyncThunk<UpdateCommentResponse, UpdateCommentRequest , { rejectValue: string | ResponseError }>('comments/updateCommentsById', async (payload, thunkAPI) => 
    await handleThunkRequest(() => api.put(`${CommentsApi.UpdateComment}/${payload.id}`, payload.data), thunkAPI)
)

export const createCommentsById = createAsyncThunk<CreateCommentResponse, CreateCommentsRequest , { rejectValue: string | ResponseError }>('comments/createCommentsById', async (payload, thunkAPI) => 
    await handleThunkRequest(() => api.post(CommentsApi.CreateComment, payload), thunkAPI)
)