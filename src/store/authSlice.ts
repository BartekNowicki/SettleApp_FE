import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from "../apiConfig.ts";
import {logout} from "./logOutSlice.ts";

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    loading: false,
    error: null,
};

export const fetchToken = createAsyncThunk(
    'auth/fetchToken',
    async () => {
        try {
            const response = await axios.post<{
                token: string;
            }>(`${API_BASE_URL}/authenticate`, {
                email: 'user1@example.com',
                password: 'hashed_password1'
            });
            return response.data.token;
        } catch (error) {
            throw new Error('Failed to fetch authentication token');
        }
    }
);

const authSlice = createSlice<AuthState>({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchToken.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(fetchToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(logout, (state) => {
                console.log("LOGOUT TRIGGERED, CLEARING TOKEN");
                state.token = null;
            });
    },
});

export default authSlice.reducer;
