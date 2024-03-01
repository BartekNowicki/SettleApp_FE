import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist';
import {RootState} from "./store";
import {deleteToken} from "./authSlice";

const clearLocalStorage = () => {
    return new Promise((resolve) => {
        localStorage.clear();
        resolve();
    });
};

const logout = createAsyncThunk<void, void, { state: RootState }>(
    'logout/logout',
    async (_, thunkAPI) => {
        await clearLocalStorage();
        thunkAPI.dispatch(deleteToken())
    });

const logoutSlice = createSlice<null>({
    name: 'logout',
    initialState: null,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => null);
        builder.addCase(logout.fulfilled, (state, action) => {
            return null;
        });
    },
});

export {logout};

export default logoutSlice.reducer;