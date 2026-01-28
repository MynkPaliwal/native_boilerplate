import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ApiService } from './Services/ApiService';
import userReducer from './reducers/UserSlice';

export const store = configureStore({
  reducer: {
    [ApiService.reducerPath]: ApiService.reducer,  //ApiService is created using RTK Query (createApi), reducerPath is usually 'api', This line registers RTK Query’s internal reducer into Redux
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>  //Middleware sits between dispatching an action and the reducer.
    getDefaultMiddleware().concat(ApiService.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
