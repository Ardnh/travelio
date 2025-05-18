import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../../constant/stateArticle";
import { getArticleList, getArticleById, updateArticleById, createArticle, deleteArticleById } from "./articlesThunks"; 
import { handleRejectedError } from "@/app/lib/error";
import { formatDate } from "@/app/lib/date";
import type { Article, ArticleParams, DialogType } from "../../models/articles/state";
import { toast } from "sonner";

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
        },

        showArticleDialog: (state, action: PayloadAction<{article :Article | null, type: DialogType }>) => {
            const { article, type } = action.payload
            if(type === null) {
                state.showDialog.data = null
                state.showDialog.type = null
            } else {
                state.showDialog.data = article
                state.showDialog.type = type
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // =========================================================================================
            .addCase(getArticleList.pending, (state) => { state.loading.getListArticleIsLoading = true})
            .addCase(getArticleList.fulfilled, (state, action) => {

                state.articles = action.payload.data.map((item) => {
                    return {
                        ...item,
                        publishedAt: formatDate(item.publishedAt)
                    }
                })

                state.loading.getListArticleIsLoading = false

            })
            .addCase(getArticleList.rejected, (state, action) => {
                state.loading.getListArticleIsLoading = false
                handleRejectedError(action)
            })

            // =========================================================================================
            .addCase(getArticleById.fulfilled, (state, action) => {

            })
            .addCase(getArticleById.rejected, (state, action) => handleRejectedError(action))

            // =========================================================================================
            .addCase(updateArticleById.pending, (state) => { state.loading.updateArticleIsLoading = true })
            .addCase(updateArticleById.fulfilled, (state, action) => {
                toast.success("Article updated")
                state.loading.updateArticleIsLoading = false

            })
            .addCase(updateArticleById.rejected, (state, action) => {
                state.loading.updateArticleIsLoading = false
                handleRejectedError(action)
            })

            // =========================================================================================
            .addCase(createArticle.pending, (state) => { state.loading.createArticleIsLoading = true})
            .addCase(createArticle.fulfilled, (state, action) => {
                toast.success("Article created")
                state.loading.createArticleIsLoading = false

            })
            .addCase(createArticle.rejected, (state, action) => {
                state.loading.createArticleIsLoading = false
                handleRejectedError(action)
            })

            // =========================================================================================
            .addCase(deleteArticleById.fulfilled, (state, action) => {
                toast.success("Article deleted")
                state.loading.deleteArticleIsLoading = false
            })
            .addCase(deleteArticleById.rejected, (state, action) => handleRejectedError(action))
    }
})

export const { setLoading, setArticleParams, showArticleDialog } = articleSlice.actions;
export default articleSlice.reducer