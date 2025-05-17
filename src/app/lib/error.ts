import { isAxiosError } from "axios";

export const handleHttpError = (error: unknown, thunkAPI : any) => {
    if (isAxiosError(error)) {
        const errData = error.response?.data ?? error.message;
        return thunkAPI.rejectWithValue(errData);
    }
    return thunkAPI.rejectWithValue('Unknown error');
}