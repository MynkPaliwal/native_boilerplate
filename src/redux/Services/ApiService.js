import { createApi } from '@reduxjs/toolkit/query/react';
import { callRestApi } from './callRestApi.js';
import { apiKeys } from './ApiMapping.js';

export const ApiService = createApi({
  reducerPath: 'users',
  baseQuery: callRestApi,
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => apiKeys.GET_USERS,
      providesTags: ['Users'],
    }),

    addUsers: builder.mutation({
      query: users => ({
        key: apiKeys.ADD_USERS,
        body: users,
      }),
      invalidatesTags: ['Users'],
    }),

    updateUsers: builder.mutation({
      query: ({ id, ...body }) => ({
        key: apiKeys.UPDATE_USERS,
        params: { id },
        body,
      }),
      invalidatesTags: ['Users'],
    }),

    deleteUsers: builder.mutation({
      query: id => ({
        key: apiKeys.DELETE_USERS,
        params: { id },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});


export const {
  useGetUsersQuery,
  useAddUsersMutation,
  useUpdateUsersMutation,
  useDeleteUsersMutation,
} = ApiService;