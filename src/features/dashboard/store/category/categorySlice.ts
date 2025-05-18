import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState, type ShowCategoryDialog } from "../../constant/stateCategory";
import { createCategory, deleteCategoryById, getCategoryById, getCategoryList, updateCategoryById } from "./categoryThunk"; 
import { handleRejectedError } from "@/app/lib/error";
import { formatDate } from "@/app/lib/date";
import { toast } from "sonner";

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
        },
        setDialog: (state, action: PayloadAction<ShowCategoryDialog>) => {
            if(action.payload.type === null) {
                state.showDialog.category = null
                state.showDialog.type = null
            } else {
                state.showDialog.category = action.payload.category
                state.showDialog.type = action.payload.type
            }
        }
    },
    extraReducers: (builder) => {
        builder

            // ============================================================================================
            .addCase(getCategoryList.pending, (state) => { state.loading.getListCategoryIsLoading = true })
            .addCase(getCategoryList.fulfilled, (state, action) => {
                state.category = action.payload.data !== null ? action.payload.data.map((item) => {
                    return {
                        ...item,
                        publishedAt: formatDate(item.publishedAt),
                        createdAt: formatDate(item.createdAt)
                    }
                }) : []

                state.loading.getListCategoryIsLoading = false
            })
            .addCase(getCategoryList.rejected, (state, action) => {
                state.loading.getListCategoryIsLoading = false
                handleRejectedError(action)
            })

            // ============================================================================================
            .addCase(getCategoryById.pending, (state) => { state.loading.getCategoryByIdIsLoading = true })
            .addCase(getCategoryById.fulfilled, (state, action) => {

                state.loading.getCategoryByIdIsLoading = false
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.loading.getCategoryByIdIsLoading = false
                handleRejectedError(action)
            })

            // ============================================================================================
            .addCase(updateCategoryById.pending, (state) => { state.loading.updateCategoryIsLoading = true })
            .addCase(updateCategoryById.fulfilled, (state, action) => {
                state.loading.updateCategoryIsLoading = false
                state.showDialog.category = null
                state.showDialog.type = null
                toast.success("Category updated")
            })
            .addCase(updateCategoryById.rejected, (state, action) => {
                state.loading.updateCategoryIsLoading = false
                handleRejectedError(action)
            })

            // ============================================================================================
            .addCase(createCategory.pending, (state) => { state.loading.createCategoryIsLoading = true })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading.createCategoryIsLoading = false
                state.showDialog.category = null
                state.showDialog.type = null
                toast.success("Category created")
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading.createCategoryIsLoading = false    
                handleRejectedError(action)
            })

            // ============================================================================================
            .addCase(deleteCategoryById.pending, (state) => { state.loading.getListCategoryIsLoading = true })
            .addCase(deleteCategoryById.fulfilled, (state, action) => {
                state.loading.deleteCategoryIsLoading = false
                toast.success("Category deleted")
            })
            .addCase(deleteCategoryById.rejected, (state, action) => {  
                state.loading.deleteCategoryIsLoading = false
                handleRejectedError(action)
            })
    }
})


export const { setLoading, setDialog } = categorySlice.actions;
export default categorySlice.reducer
