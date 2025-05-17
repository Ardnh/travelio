import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../../constant/stateArticle";
import { getArticleList, getArticleById, updateArticleById, createArticleById, deleteArticleById } from "./articlesThunks"; 
import { handleRejectedError } from "@/app/lib/error";
import { formatDate } from "@/app/lib/date";
import type { ArticleParams } from "../../models/articles/state";

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{ actionName: string; status: boolean }>) => {
            const { actionName, status } = action.payload;
            switch (actionName) {
                case 'getArticleList':
                    state.loading.getListArticleIsLoading = status;
                    break;

                case 'getArticleById':
                    state.loading.getArticleByIdIsLoading = status;
                    break;

                case 'updateArticle':
                    state.loading.updateArticleIsLoading = status
                    break;

                case 'createArticle':
                    state.loading.createArticleIsLoading = status
                    break;
                    
                case 'deleteArticle':
                    state.loading.deleteArticleIsLoading = status
                    break;
                default:
                    break;
            }
        },
        setArticleParams: (state, action: PayloadAction<ArticleParams>) => {
            state.articlesParams = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticleList.fulfilled, (state, action) => {

                state.articles = action.payload.data.map((item) => {
                    return {
                        ...item,
                        publishedAt: formatDate(item.publishedAt)
                    }
                })

            })
            .addCase(getArticleList.rejected, (state, action) => handleRejectedError(action))
            .addCase(getArticleById.fulfilled, (state, action) => {

            })
            .addCase(getArticleById.rejected, (state, action) => handleRejectedError(action))
            .addCase(updateArticleById.fulfilled, (state, action) => {

            })
            .addCase(updateArticleById.rejected, (state, action) => handleRejectedError(action))
            .addCase(createArticleById.fulfilled, (state, action) => {

            })
            .addCase(createArticleById.rejected, (state, action) => handleRejectedError(action))
            .addCase(deleteArticleById.fulfilled, (state, action) => {

            })
            .addCase(deleteArticleById.rejected, (state, action) => handleRejectedError(action))
    }
})

export const { setLoading, setArticleParams } = articleSlice.actions;
export default articleSlice.reducer