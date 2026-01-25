export const apiKeys = {
    GET_USERS: 'GET_USERS',
    ADD_USERS: 'ADD_USERS',
    UPDATE_USERS: 'UPDATE_USERS',
    DELETE_USERS: 'DELETE_USERS',
    GET_POSTS: 'GET_POSTS'
} as const

export const apiMapping = { //All the APIs endpoints should be here.
    GET_USERS: { url: '/users', method: 'GET' },
    ADD_USERS: { url: '/users/add', method: 'POST' },
    UPDATE_USERS: { url: '/users/:id', method: 'PUT' },
    DELETE_USERS: { url: '/users/:id', method: 'DELETE' },
    GET_POSTS: { url: '/posts', method: 'GET' }
}