import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateArticleResponse, GetArticleByIdResponse, GetArticleListResponse, UpdateArticleResponse } from "../../models/articles/response";
import type { ResponseError } from "@/app/models/HttpError";
import { handleThunkRequest } from "@/app/lib/handleThunkRequest";
import { api } from "@/app/services/api";
import { ArticlesApi } from "../../constant/url";
import type { CreateArticleRequest, UpdateArticleRequest } from "../../models/articles/request";
import type { ArticleParams } from "../../models/articles/state";

export const getArticleList = createAsyncThunk<GetArticleListResponse, ArticleParams, { rejectValue: string | ResponseError }>('article/getArticleList', async (payload, thunkAPI) => {

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

export const getArticleById = createAsyncThunk<GetArticleByIdResponse, string, { rejectValue: string | ResponseError }>('article/getArticleById', async (payload: string, thunkAPI) =>
    await handleThunkRequest(() => api.get(`${ArticlesApi.GetArticleById}/${payload}`), thunkAPI)
)

export const deleteArticleById = createAsyncThunk<void, string, { rejectValue: string | ResponseError }>('article/deleteArticleById', async (payload: string, thunkAPI) =>
    await handleThunkRequest(() => api.delete(`${ArticlesApi.DeleteArticle}/${payload}`), thunkAPI)
)

export const updateArticleById = createAsyncThunk<UpdateArticleResponse, UpdateArticleRequest, { rejectValue: string | ResponseError }>('article/updateArticleById', async (payload, thunkAPI) =>
    await handleThunkRequest(() => api.put(`${ArticlesApi.UpdateArticle}/${payload.id}`, payload.data), thunkAPI)
)

export const createArticleById = createAsyncThunk<CreateArticleResponse, CreateArticleRequest, { rejectValue: string | ResponseError }>('article/createArticleById', async (payload, thunkAPI) =>
    await handleThunkRequest(() => api.put(ArticlesApi.CreateArticle, payload), thunkAPI)
)