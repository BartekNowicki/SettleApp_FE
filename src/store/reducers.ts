import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventReducer from './eventSlice';
import costReducer from './costSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
    user: userReducer,
    event: eventReducer,
    cost: costReducer,
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
