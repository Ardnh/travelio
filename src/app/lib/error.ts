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

export const handleRejectedError = (action: PayloadAction<string | ResponseError | undefined>, fallbackTitle = "Action failed") => {
    if (typeof action.payload === "string") {
        toast.error(fallbackTitle, {
            description: action.payload,
        });
    } else if (typeof action.payload === "object" && action.payload?.error) {
        const { error } = action.payload as ResponseError;
        toast.error(error.name || fallbackTitle, {
            description: error.message || "Something went wrong",
        });
    } else {
        toast.error(fallbackTitle, {
            description: "Something went wrong",
        });
    }
};
