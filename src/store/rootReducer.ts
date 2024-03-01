import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventReducer from './eventSlice';
import costReducer from './costSlice';
import authReducer from './authSlice';
import logoutReducer from './logOutSlice'

const rootReducer = combineReducers({
    user: userReducer,
    event: eventReducer,
    cost: costReducer,
    auth: authReducer,
    logout: logoutReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
