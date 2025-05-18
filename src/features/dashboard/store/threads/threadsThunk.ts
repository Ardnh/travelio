import { handleThunkRequest } from "@/app/lib/handleThunkRequest";
import type { ResponseError } from "@/app/models/HttpError";
import { api } from "@/app/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticlesApi } from "../../constant/url";
import type { GetArticleListResponse } from "../../models/articles/response";
import type { ArticleParams } from "../../models/articles/state";

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