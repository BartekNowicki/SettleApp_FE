import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {User} from "../model/User.ts";
import API_BASE_URL from "../apiConfig.ts";

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk<User[], void>(
    'users/fetchUsers',
    async () => {
        try {
            const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export default userSlice.reducer;
