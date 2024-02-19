import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventReducer from './eventSlice';
import costReducer from './costSlice';

const rootReducer = combineReducers({
    user: userReducer,
    event: eventReducer,
    cost: costReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
