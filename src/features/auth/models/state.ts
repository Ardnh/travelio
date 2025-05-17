import type { User } from "./response"

export interface AuthState {
    user: User | null
    isLogin: boolean
    token: string
    loading: {
        loginIsLoading: boolean
        registerIsLoading: boolean
        userIsLoading: boolean
    }
}