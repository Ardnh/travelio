import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../constant/init.state";
import { login, register, me } from './authThunks'
import { StorageUtils } from "@/app/lib/storage";

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

                default:
                    break;
            }
        }
    },
    extraReducers: (builder) => {

        builder.addCase(login.fulfilled, (state, action) => {

            const { jwt, user } = action.payload
            StorageUtils.setItem('token', jwt)
            StorageUtils.setItem('user', JSON.stringify(user))
            state.token = jwt
            state.user = user

            console.log("response")
            console.log(jwt)
            console.log(user)

        })

        builder.addCase(register.fulfilled, (state, action) => {

            const { jwt, user } = action.payload;
            StorageUtils.setItem('token', jwt);
            state.token = jwt;
            state.user = user;

        });

        builder.addCase(me.fulfilled, (state, action) => {

            state.user = action.payload;
            StorageUtils.setItem('user', action.payload)

        });

    }
})

export const { setLoading } = authSlice.actions;
export default authSlice.reducer