import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type dashboardInitialState = {
    currentPage : string
}

const initialState : dashboardInitialState = {
    currentPage: 'Threads'
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload
        }
    }
})

export const { setCurrentPage } = dashboardSlice.actions
export default dashboardSlice.reducer