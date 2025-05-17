import { api } from "@/app/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginRegisterResponse, UserResponse } from "../models/response";
import { AuthApi } from "../constant/url";
import type { LoginRequest, RegisterRequest } from "../models/request";
import type { ResponseError } from "@/app/models/HttpError";
import { handleThunkRequest } from "@/app/lib/handleThunkRequest";

export const login = createAsyncThunk<LoginRegisterResponse, LoginRequest, { rejectValue: string | ResponseError }>('auth/login', async (payload, thunkAPI) => {

    const form = new URLSearchParams()
    form.append('identifier', payload.identifier)
    form.append('password', payload.password)

    return await handleThunkRequest(() => api.post(AuthApi.Login, form, {
        headers : {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    }), thunkAPI)
});

export const register = createAsyncThunk<LoginRegisterResponse, RegisterRequest, { rejectValue: string | ResponseError }>('auth/register', async (payload, thunkAPI) =>
    await handleThunkRequest(() => api.post(AuthApi.Register, payload), thunkAPI)
);

export const me = createAsyncThunk<UserResponse, void, { rejectValue: string | ResponseError }>('auth/me', async (_, thunkAPI) =>
    await handleThunkRequest(() => api.get(AuthApi.Me), thunkAPI)
);