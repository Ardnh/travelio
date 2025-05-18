import type { Category } from "../models/categories/state"

export type CategoryDialogType = 'Create' | 'Edit' | null

export interface ShowCategoryDialog {
    type: CategoryDialogType
    category: Category | null
}

export interface CategoryInitialState {
    category: Category[],
    showDialog: ShowCategoryDialog
    loading: {
        getListCategoryIsLoading: boolean
        getCategoryByIdIsLoading: boolean
        updateCategoryIsLoading: boolean
        createCategoryIsLoading: boolean
        deleteCategoryIsLoading: boolean
    }
}

export const initialState: CategoryInitialState = {
    category: [],
    showDialog: {
        type: null,
        category: null
    },
    loading: {
        getListCategoryIsLoading: false,
        getCategoryByIdIsLoading: false,
        updateCategoryIsLoading: false,
        createCategoryIsLoading: false,
        deleteCategoryIsLoading: false
    },
}