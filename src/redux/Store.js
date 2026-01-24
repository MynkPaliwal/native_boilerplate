import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ApiService } from './Services/ApiService.js';
import userReducer from './reducers/UserSlice.js';

export const store = configureStore({
    reducer: {
        [ApiService.reducerPath]: ApiService.reducer,
        users: userReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(ApiService.middleware),
});

setupListeners(store.dispatch);