import { handleThunkRequest } from "@/app/lib/handleThunkRequest";
import type { ResponseError } from "@/app/models/HttpError";
import { api } from "@/app/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticlesApi, CommentsApi } from "../../constant/url";
import type { GetArticleListResponse } from "../../models/articles/response";
import type { ArticleParams } from "../../models/articles/state";
import type { UpdateCommentRequest, CreateCommentsRequest } from "../../models/comments/request";
import type { GetCommentListResponse, GetCommentByIdResponse, UpdateCommentResponse, CreateCommentResponse } from "../../models/comments/response";

export const getArticleThreadsList = createAsyncThunk<GetArticleListResponse, ArticleParams, { rejectValue: string | ResponseError }>('article/getArticleList', async (payload, thunkAPI) => {

    const params: Record<string, any> = {
        "pagination[page]": payload.page,
        "pagination[pageSize]": payload.pageSize,
    };

    if (payload.populateCommentPopulateUser) {
        params["populate[comments][populate][user]"] = payload.populateCommentPopulateUser;
    }
    if (payload.populateUser) {
        params["populate[user]"] = payload.populateUser;
    }
    if (payload.populateCategory) {
        params["populate[category]"] = payload.populateCategory;
    }
    if (payload.filterTitle) {
        params["filters[title][$eqi]"] = payload.filterTitle;
    }
    if (payload.filterCategoryName) {
        params["filters[category][name][$eqi]"] = payload.filterCategoryName;
    }
    if (payload.populate) {
        params["populate"] = payload.populate;
    }

    return await handleThunkRequest(() => api.get(ArticlesApi.GetArticlesList, {
        params
    }), thunkAPI)
})

export const getCommentsList = createAsyncThunk<GetCommentListResponse, void, { rejectValue: string | ResponseError }>('comments/getCommentsList', async (_, thunkAPI) =>
    await handleThunkRequest(() => api.get(CommentsApi.GetCommentsList), thunkAPI)
)

export const getCommentsById = createAsyncThunk<GetCommentByIdResponse, string, { rejectValue: string | ResponseError }>('comments/getCommentsById', async (payload: string, thunkAPI) =>
    await handleThunkRequest(() => api.get(`${CommentsApi.GetCommentsList}/${payload}`), thunkAPI)
)

export const deleteCommentsById = createAsyncThunk<void, string, { rejectValue: string | ResponseError }>('comments/deleteCommentsById', async (payload: string, thunkAPI) =>
    await handleThunkRequest(() => api.delete(`${CommentsApi.DeleteComment}/${payload}`), thunkAPI)
)

export const updateCommentsById = createAsyncThunk<UpdateCommentResponse, UpdateCommentRequest, { rejectValue: string | ResponseError }>('comments/updateCommentsById', async (payload, thunkAPI) =>
    await handleThunkRequest(() => api.put(`${CommentsApi.UpdateComment}/${payload.id}`, payload.data), thunkAPI)
)

export const createCommentsById = createAsyncThunk<CreateCommentResponse, CreateCommentsRequest, { rejectValue: string | ResponseError }>('comments/createCommentsById', async (payload, thunkAPI) =>
    await handleThunkRequest(() => api.post(CommentsApi.CreateComment, payload), thunkAPI)
)