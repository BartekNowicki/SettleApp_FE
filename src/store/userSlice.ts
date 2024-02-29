import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {User} from "../model/User.ts";
import API_BASE_URL from "../apiConfig.ts";
import {AppDispatch, RootState} from "./store.ts";
import {validateTokenOrThrow} from "../security/tokenValidator.ts";


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


export const fetchUsers = createAsyncThunk<User[], void, { state: RootState, dispatch: AppDispatch }>(
    'users/fetchUsers',
    async (_, {getState, dispatch}) => {
        try {
            const {token} = getState().auth;
            validateTokenOrThrow(token, dispatch);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get<User[]>(`${API_BASE_URL}/users`, config);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }
);

const userSlice = createSlice<UserState>({
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
