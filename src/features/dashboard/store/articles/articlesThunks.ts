import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateArticleResponse, GetArticleByIdResponse, GetArticleListResponse, UpdateArticleResponse } from "../../models/articles/response";
import type { ResponseError } from "@/app/models/HttpError";
import { handleThunkRequest } from "@/app/lib/handleThunkRequest";
import { api } from "@/app/services/api";
import { ArticlesApi } from "../../constant/url";
import type { CreateArticleRequest, UpdateArticleRequest } from "../../models/articles/request";
import type { ArticleParams } from "../../models/articles/state";
import type { UploadImageResponse } from "../../models/upload/response";
import axios from "axios";

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

export const updateArticleById = createAsyncThunk<UpdateArticleResponse, UpdateArticleRequest & { file: File | null }, { rejectValue: string | ResponseError }>('article/updateArticleById', async (payload, thunkAPI) => {
    try {
        let coverImageUrl = payload.data.cover_image_url;

        if (payload.file) {
            const formData = new FormData();
            formData.append("files", payload.file);

            const uploadResponse = await api.post<UploadImageResponse>(
                "/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            coverImageUrl = uploadResponse.data[0].url;
        }

        const articlePayload: UpdateArticleRequest = {
            id: payload.id,
            data: {
                ...payload.data,
                cover_image_url: coverImageUrl,
                title: payload.data.title,
                description: payload.data.description,
                category: payload.data.category
            }
        };

        const response = await api.put<UpdateArticleResponse>(
            `${ArticlesApi.UpdateArticle}/${articlePayload.id}`,
            articlePayload
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            return thunkAPI.rejectWithValue(error.response.data as ResponseError);
        }

        return thunkAPI.rejectWithValue("Unexpected error occurred while creating article");
    }
})

export const createArticle = createAsyncThunk<CreateArticleResponse, CreateArticleRequest & { file: File | null }, { rejectValue: string | ResponseError }>('article/createArticleById', async (payload, thunkAPI) => {
    try {
        let coverImageUrl = payload.data.cover_image_url;

        if (payload.file) {
            const formData = new FormData();
            formData.append("files", payload.file);

            const uploadResponse = await api.post<UploadImageResponse>(
                "/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            coverImageUrl = uploadResponse.data[0].url;
        }

        const articlePayload: CreateArticleRequest = {
            data: {
                ...payload.data,
                cover_image_url: coverImageUrl,
            },
        };

        const response = await api.post<CreateArticleResponse>(
            ArticlesApi.CreateArticle,
            articlePayload
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            return thunkAPI.rejectWithValue(error.response.data as ResponseError);
        }

        return thunkAPI.rejectWithValue("Unexpected error occurred while creating article");
    }
}
);
