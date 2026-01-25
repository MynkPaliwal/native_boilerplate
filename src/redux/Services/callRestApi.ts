import { apiMapping } from './ApiMapping';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { QueryArg } from './Types';

const axiosClient = axios.create({
    baseURL: 'https://dummyjson.com',
});

axiosClient.interceptors.request.use((config) => {
    const token = 'Testing';
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API error:', error?.response?.data || error?.message);
        return Promise.reject(error);
    }
);

export const callRestApi: BaseQueryFn<QueryArg, unknown, unknown> = async (arg, api, extraOptions) => {
    let apiConfig;
    let body;
    let pathParams;

    if (typeof arg === 'string') {
        apiConfig = apiMapping[arg];
    } else if (typeof arg === 'object' && arg) {
        apiConfig = apiMapping[arg.key];
        body = arg.body;
        pathParams = arg.params;
    }

    if (!apiConfig) {
        return {
            error: {
                status: 'CUSTOM_ERROR',
                data: `Invalid API config: ${JSON.stringify(arg)}`,
            },
        };
    }

    const { url, method } = apiConfig;
    const finalUrl = pathParams?.id ? url.replace(':id', String(pathParams.id)) : url;

    try {
        const response = await axiosClient({
            url: finalUrl,
            method: method as AxiosRequestConfig['method'],
            signal: api?.signal,
            ...(method !== 'GET' && body ? { data: body } : {}),
        });

        return { data: response.data };
    } catch (error) {
        const axiosError = error as AxiosError;
        return {
            error: {
                status: axiosError.response?.status || 'FETCH_ERROR',
                data: axiosError.response?.data || axiosError.message || String(error),
            },
        };
    }
};
