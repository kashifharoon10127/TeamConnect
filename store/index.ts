import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import callReducer from './slices/callSlice';
import chatReducer from './slices/chatSlice';
import { dashboardApi } from './api/dashboardApi';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootReducer = combineReducers({
    auth: authReducer,
    call: callReducer,
    chat: chatReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth'], // Only persist auth state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(dashboardApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
