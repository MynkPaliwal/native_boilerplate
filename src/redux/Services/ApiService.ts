import { createApi } from '@reduxjs/toolkit/query/react';
import { callRestApi } from './callRestApi.ts';
import { apiKeys } from './ApiMapping';
import { User, DeleteUserRequest } from './Types';

export const ApiService = createApi({
  reducerPath: 'api',
  baseQuery: callRestApi,
  tagTypes: ['Users', 'Posts'],
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => {
        return apiKeys.GET_USERS;
      },
      providesTags: ['Users'],
    }),
    addUsers: builder.mutation<User, Partial<User>>({
      query: (users) => ({
        key: apiKeys.ADD_USERS,
        body: users,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUsers: builder.mutation<User, Partial<User>>({
      query: ({ id, ...body }) => ({
        key: apiKeys.UPDATE_USERS,
        params: { id },
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUsers: builder.mutation<User, DeleteUserRequest>({
      query: (id) => ({
        key: apiKeys.DELETE_USERS,
        params: { id },
      }),
      invalidatesTags: ['Users'],
    }),
    getPosts: builder.query({
      query: () => apiKeys.GET_POSTS,
      providesTags: ['Posts'],
    })
  }),
});

export const {
  useGetUsersQuery,
  useAddUsersMutation,
  useUpdateUsersMutation,
  useDeleteUsersMutation,
} = ApiService;