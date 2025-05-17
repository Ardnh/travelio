import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../../constant/stateCategory";
import { createCategoryById, deleteCategoryById, getCategoryById, getCategoryList, updateCategoryById } from "./categoryThunk"; 
import { handleRejectedError } from "@/app/lib/error";

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{ actionName: string; status: boolean }>) => {
            const { actionName, status } = action.payload;
            switch (actionName) {
                case 'getArticleList':
                    state.loading.getListCategoryIsLoading = status;
                    break;

                case 'getCategoryById':
                    state.loading.getCategoryByIdIsLoading = status;
                    break;

                case 'updateCategory':
                    state.loading.updateCategoryIsLoading = status
                    break;

                case 'createCategory':
                    state.loading.createCategoryIsLoading = status
                    break;
                    
                case 'deleteCategory':
                    state.loading.deleteCategoryIsLoading = status
                    break;
                default:
                    break;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.fulfilled, (state, action) => {

            })
            .addCase(getCategoryList.rejected, (state, action) => handleRejectedError(action))
            .addCase(getCategoryById.fulfilled, (state, action) => {

            })
            .addCase(getCategoryById.rejected, (state, action) => handleRejectedError(action))
            .addCase(updateCategoryById.fulfilled, (state, action) => {

            })
            .addCase(updateCategoryById.rejected, (state, action) => handleRejectedError(action))
            .addCase(createCategoryById.fulfilled, (state, action) => {

            })
            .addCase(createCategoryById.rejected, (state, action) => handleRejectedError(action))
            .addCase(deleteCategoryById.fulfilled, (state, action) => {

            })
            .addCase(deleteCategoryById.rejected, (state, action) => handleRejectedError(action))
    }
})