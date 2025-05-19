import axios, { AxiosError, isAxiosError, type AxiosRequestConfig, type AxiosRequestHeaders, type AxiosResponse, type InternalAxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";
import type { ResponseError } from "../models/HttpError";

interface Response<T> {
    result: T | null,
    err: ResponseError | string | null
}

interface IAxiosRequestHeaders extends AxiosRequestHeaders {
    "X-API-Key"?: string;
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 60000
})

api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {

    const token = localStorage.getItem("token") 
    config.headers = {
        ...((config.headers as RawAxiosRequestHeaders) ?? {}),
        Authorization: `Bearer ${token === null ? '' : token}`,
    } as IAxiosRequestHeaders

    return config
})

api.interceptors.response.use(
    <T>(response: AxiosResponse<T>) => response as T,
    async (error: AxiosError<ResponseError>) => {
        return Promise.reject(error)
    }
)

// GET
export const Get = async <T = any>(url: string,config?: AxiosRequestConfig): Promise<Response<T>> => {
    try {
        const result = await api.get<T>(url, config);
        return {
            result: result.data,
            err: null,
        };
    } catch (error) {
        return handleError<T>(error);
    }
};

// POST
export const Post = async <T = any>( url: string, data?: any, config?: AxiosRequestConfig): Promise<Response<T>> => {
    try {
        const result = await api.post<T>(url, data, config);
        return {
            result: result.data,
            err: null,
        };
    } catch (error) {
        return handleError<T>(error);
    }
};

// PUT
export const Put = async <T = any>(url: string,data?: any,config?: AxiosRequestConfig): Promise<Response<T>> => {
    try {
        const result = await api.put<T>(url, data, config);
        return {
            result: result.data,
            err: null,
        };
    } catch (error) {
        return handleError<T>(error);
    }
};

// DELETE
export const Delete = async <T = any>(url: string,config?: AxiosRequestConfig): Promise<Response<T>> => {
    try {
        const result = await api.delete<T>(url, config);
        return {
            result: result.data,
            err: null,
        };
    } catch (error) {
        return handleError<T>(error);
    }
};

// Shared error handler
const handleError = <T>(error: unknown): Response<T> => {
    if (isAxiosError(error)) {
        const errData = error.response?.data ?? error.message;
        return {
            result: null,
            err: errData,
        };
    }

    return {
        result: null,
        err: 'Unknown error',
    };
};