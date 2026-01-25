import { apiKeys } from './ApiMapping';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age?: number;
};

export type DeleteUserRequest = number;

export interface QueryArgObject {
    key: ApiKey;
    body?: any;
    params?: {
        id?: number;
        [key: string]: any;
    };
}

export type ApiKey = keyof typeof apiKeys;

export type QueryArg = ApiKey | QueryArgObject;
