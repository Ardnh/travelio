import type { AuthState } from "../models/state";

export const initialState : AuthState = {
    user: null,
    isLogin: false,
    token: "",
    loading: {
        loginIsLoading: false,
        registerIsLoading: false,
        userIsLoading: false,
        logoutIsLoading: false
    }
}