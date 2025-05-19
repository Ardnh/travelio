import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../../constant/stateComment";
import { handleRejectedError } from "@/app/lib/error";
import { createCommentsById, deleteCommentsById, getCommentsById, getCommentsList, updateCommentsById } from "@/features/dashboard/store/comments/commentThunks"

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{ actionName: string; status: boolean }>) => {
            const { actionName, status } = action.payload;
            switch (actionName) {
                case 'getArticleList':
                    state.loading.getListCommentsIsLoading = status;
                    break;

                case 'getCommentsById':
                    state.loading.getCommentsByIdIsLoading = status;
                    break;

                case 'updateComments':
                    state.loading.updateCommentsIsLoading = status
                    break;

                case 'createComments':
                    state.loading.createCommentsIsLoading = status
                    break;

                case 'deleteComments':
                    state.loading.deleteCommentsIsLoading = status
                    break;
                default:
                    break;
            }
        }
    },
    extraReducers: (builder) => {
    //     builder
    //         .addCase(getCommentsList.fulfilled, (state, action) => {

    //         })
    //         .addCase(getCommentsList.rejected, (state, action) => handleRejectedError(action))
    //         .addCase(getCommentsById.fulfilled, (state, action) => {

    //         })
    //         .addCase(getCommentsById.rejected, (state, action) => handleRejectedError(action))
    //         .addCase(updateCommentsById.fulfilled, (state, action) => {

    //         })
    //         .addCase(updateCommentsById.rejected, (state, action) => handleRejectedError(action))
    //         .addCase(createCommentsById.fulfilled, (state, action) => {

    //         })
    //         .addCase(createCommentsById.rejected, (state, action) => handleRejectedError(action))
    //         .addCase(deleteCommentsById.fulfilled, (state, action) => {

    //         })
    //         .addCase(deleteCommentsById.rejected, (state, action) => handleRejectedError(action))
    }
})

export const { setLoading } = commentSlice.actions
export default commentSlice.reducer