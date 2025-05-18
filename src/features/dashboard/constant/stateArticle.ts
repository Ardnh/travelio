import type { ArticleInitialState } from "../models/articles/state";

export const initialState : ArticleInitialState = {
    articles: [],
    showDialog:{
        type: null,
        data: null
    },
    loading: {
        getListArticleIsLoading: false,
        getArticleByIdIsLoading: false,
        updateArticleIsLoading: false,
        createArticleIsLoading: false,
        deleteArticleIsLoading: false
    },
    articlesParams: {
        page: 1,
        pageSize: 30,
        populateCommentPopulateUser: true,
        populateUser: true,
        populateCategory: true,
        filterTitle: "",
        filterCategoryName: "",
        populate: false
    }
}