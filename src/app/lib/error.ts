import type { PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { ResponseError } from "../models/HttpError";

export const handleHttpError = (error: unknown, thunkAPI: any) => {
    if (isAxiosError(error)) {
        const errData = error.response?.data ?? error.message;
        return thunkAPI.rejectWithValue(errData);
    }
    return thunkAPI.rejectWithValue('Unknown error');
}

export const handleRejectedError = (action : PayloadAction< string | ResponseError | undefined >) => {

    if (typeof action.payload === 'string') {
        toast.error("Failed to login", {
            description: action.payload
        })
    } else if (typeof action.payload === 'object') {
        const { error } = action.payload as ResponseError
        toast.error(error.name, {
            description: error.message,
        })
    } else {
        toast.error("Something went wrong")
    }
}