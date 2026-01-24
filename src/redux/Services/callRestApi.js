import { apiMapping } from './ApiMapping.js'
import axios from 'axios';

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

export const callRestApi = async (arg, api, extraOptions) => {
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
        }
    }

    const { url, method } = apiConfig;
    const finalUrl = pathParams?.id ? url.replace(':id', String(pathParams.id)) : url;

    try {
        const response = await axiosClient({
            url: finalUrl,
            method,
            signal: api?.signal,
            ...(method !== 'GET' && body ? { data: body } : {}),
        });

        return { data: response.data };
    } catch (error) {
        return {
            error: {
                status: error?.response?.status,
                data: error?.response?.data || error?.message || String(error),
            },
        };
    }
}
