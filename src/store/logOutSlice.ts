import {createSlice} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist';

const logoutSlice = createSlice({
    name: 'logout',
    initialState: null,
    reducers: {
        logout: () => null, // Action creator for logout
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => null);
    },
});

export const {logout} = logoutSlice.actions;
export default logoutSlice.reducer;
