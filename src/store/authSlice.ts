import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from "../apiConfig";
import {ErrorMessage} from "../enums/ErrorMessage";

interface AuthState {
    token: string | null;
    authLoading: boolean;
    authError: string | null;
}

const initialState: AuthState = {
    token: null,
    authLoading: false,
    authError: null,
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
            throw new Error(ErrorMessage.FAILED_TO_FETCH_AUTHENTICATION_TOKEN);
        }
    }
);

const authSlice = createSlice<AuthState>({
    name: 'auth',
    initialState,
    reducers: {
        setAuthError: (state, action: PayloadAction<string | null>) => {
            state.authError = action.payload;
        },
        deleteToken: (state) => {
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchToken.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
            })
            .addCase(fetchToken.fulfilled, (state, action: PayloadAction<string>) => {
                state.authLoading = false;
                state.token = action.payload;
            })
            .addCase(fetchToken.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.error.message || ErrorMessage.AN_ERROR_OCCURRED;
            })
    },
});

export const {setAuthError, deleteToken} = authSlice.actions;

export default authSlice.reducer;
