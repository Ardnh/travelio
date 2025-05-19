import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../constant/init.state";
import { login, register, me, logout } from './authThunks'
import { StorageUtils } from "@/app/lib/storage";
import { handleRejectedError } from "@/app/lib/error";
import { toast } from "sonner";
import { delay } from "@/app/lib/utils";

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{ actionName: string; status: boolean }>) => {
            const { actionName, status } = action.payload;
            switch (actionName) {
                case 'login':
                    state.loading.loginIsLoading = status;
                    break;

                case 'register':
                    state.loading.registerIsLoading = status;
                    break;

                case 'user':
                    state.loading.userIsLoading = status
                    break;

                case 'logout':
                    state.loading.logoutIsLoading = status
                    break;

                default:
                    break;
            }
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(login.fulfilled, (state, action) => {

                const { jwt, user } = action.payload
                StorageUtils.setItem('token', jwt)
                StorageUtils.setItem('user', JSON.stringify(user))
                state.token = jwt
                state.user = user

                toast("Login successfully")

            })
            .addCase(login.rejected, (state, action) => handleRejectedError(action))
            .addCase(register.fulfilled, (state, action) => {

                const { jwt, user } = action.payload;
                StorageUtils.setItem('token', jwt);
                state.token = jwt;
                state.user = user;

                toast("Register successfully")

            })
            .addCase(register.rejected, (state, action) => handleRejectedError(action))
            .addCase(me.fulfilled, (state, action) => {

                state.user = action.payload;
                StorageUtils.setItem('user', action.payload)

            })
            .addCase(me.rejected, (state, action) => handleRejectedError(action))
            .addCase(logout.pending, (state) => {
                state.loading.logoutIsLoading = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading.logoutIsLoading = false
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading.logoutIsLoading = false
            })
    }
})

export const { setLoading } = authSlice.actions;
export default authSlice.reducer