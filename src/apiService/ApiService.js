import { createApi } from "@reduxjs/toolkit/query"

export const ApiService = createApi({
    reducerPath: 'users',
    baseQuery: callRestApi(),
    tagTypes: ['users'],
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({ url: '/users' }),
            providesTags: ['Users']
        }),
        addUsers: build.mutation({
            query: (users) => ({
                url: `users/add`,
                method: 'POST',
                data: users
            }),
            invalidatesTags: ['Users']
        }),
        updateUsers: build.mutation({
            query: (body) => ({
                url: `users/${body.id}`,
                method: 'PUT',
                data: body
            }),
            invalidatesTags: ['Users']
        }),
        deleteUsers: build.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users']
        })
    })
});

export const {
    useGetUsersQuery
} = ApiService