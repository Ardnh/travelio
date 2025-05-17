import { isAxiosError, type AxiosResponse } from 'axios';

export const handleThunkRequest = async <T>(request: () => Promise<AxiosResponse<T>>, thunkAPI: any) : Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    try {
        const response = await request();
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            const errData = error.response?.data ?? error.message;
            return thunkAPI.rejectWithValue(errData);
        }
        return thunkAPI.rejectWithValue('Unknown error');
    }
}
