import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import userReducer from './userSlice';
import eventReducer from './eventSlice';
import costReducer from './costSlice';
import logger from 'redux-logger';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    event: eventReducer,
    cost: costReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user', 'event', 'cost'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['FLUSH', 'REHYDRATE', 'PAUSE', 'PERSIST', 'PURGE', 'REGISTER', 'persist/PERSIST'],
            },
        }).concat(logger),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
