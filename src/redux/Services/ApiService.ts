import { createApi } from '@reduxjs/toolkit/query/react';
import { callRestApi } from './callRestApi.ts';
import { apiKeys } from './ApiMapping';
import { User, DeleteUserRequest } from './Types';

export const ApiService = createApi({ //This creates one API service Internally, RTK Query will: Create reducers, Create middleware, Create cache logic, Track request lifecycle, You usually create one API slice per backend (or major domain)
  reducerPath: 'api', //Defines where in Redux state RTK Query will store its cache
  baseQuery: callRestApi,
  tagTypes: ['Users', 'Posts'], //tagTypes defines the types of cache labels that RTK Query can use to automatically refetch or invalidate data.
  endpoints: builder => ({ //endpoints is where you declare all your API calls (queries & mutations).
    getUsers: builder.query({ //Defines a read-only query endpoint | Used for GET requests
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