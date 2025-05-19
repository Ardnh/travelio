import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article, ArticleParams } from "../../models/articles/state";
import { getArticleThreadsList } from "./threadsThunk";
import { handleRejectedError } from "@/app/lib/error";
import { formatDate } from "@/app/lib/date";
import { createCommentsById } from "../comments/commentThunks";

export type ThreadInitialState = {
    articles: Article[],
    articleParams: ArticleParams
    hasMore: boolean
    totalArticle: number
    loading: {
        getArticleIsLoading: boolean
        createCommentIsLoading : {
            index: number
            status: boolean
        }
    }
}

const initialState: ThreadInitialState = {
    articles: [],
    articleParams: {
        page: 1,
        pageSize: 3,
        populateCommentPopulateUser: true,
        populateUser: true,
        populateCategory: true,
        filterTitle: "",
        filterCategoryName: "",
        populate: false
    },
    totalArticle: 0,
    hasMore: true,
    loading: {
        getArticleIsLoading: false,
        createCommentIsLoading : {
            index: -1,
            status: false
        }
    }
}

export const threadsSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{ actionName: string; status: boolean, index?: number }>) => {
            const { actionName, status, index } = action.payload;
            switch (actionName) {
                case 'getArticle':
                    state.loading.getArticleIsLoading = status;
                    break;
                case 'createComment' :
                    state.loading.createCommentIsLoading.index = index ?? -1
                    state.loading.createCommentIsLoading.status = status
                    break;
                default:
                    break;
            }
        },
        setArticleThreadsParams: (state, action: PayloadAction<ArticleParams>) => {
            state.articleParams = action.payload
        },
        setHasMore: (state, action: PayloadAction<boolean>) => {
            state.hasMore = action.payload
        },
    },
    extraReducers: (builder) => {
        builder

            // =========================================================================================
            .addCase(getArticleThreadsList.pending, (state) => { state.loading.getArticleIsLoading = true })
            .addCase(getArticleThreadsList.fulfilled, (state, action) => {

                const { data, meta } = action.payload
                const newArticles = data.map((item) => ({
                    ...item,
                    publishedAt: formatDate(item.publishedAt),
                }));

                if (action.payload.meta.pagination.page === 1) {
                    state.articles = newArticles;
                } else {
                    state.articles = [...state.articles, ...newArticles];
                }

                state.articles = [...state.articles, ...newArticles];
                state.articleParams.page = meta.pagination.page
                state.articleParams.pageSize = meta.pagination.pageSize
                state.totalArticle = meta.pagination.total

                state.loading.getArticleIsLoading = false

            })
            .addCase(getArticleThreadsList.rejected, (state, action) => {
                state.loading.getArticleIsLoading = false
                handleRejectedError(action)
            })

            // =========================================================================================
            .addCase(createCommentsById.fulfilled, (state, action) => {
                console.log("create comment response")
                console.log(action.payload.data)

            })
            .addCase(createCommentsById.rejected, (state, action) => { handleRejectedError(action)})

    }
})

export const { setArticleThreadsParams, setHasMore, setLoading } = threadsSlice.actions
export default threadsSlice.reducer
