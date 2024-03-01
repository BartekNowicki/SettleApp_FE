import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {User} from "../model/User.ts";
import API_BASE_URL from "../apiConfig.ts";
import {AppDispatch, RootState} from "./store";
import {setAuthError} from './authSlice';
import {validateTokenOrThrow} from "../security/tokenValidator";
import {ErrorMessage} from "../enums/ErrorMessage";


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


export const fetchUsers = createAsyncThunk<User[], void, {
    state: RootState,
    dispatch: AppDispatch,
}>(
    'users/fetchUsers',
    async (_, {getState, dispatch}) => {

        try {
            const {token} = getState().auth;
            validateTokenOrThrow(token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get<User[]>(`${API_BASE_URL}/users`, config);
            return response.data;
        } catch (error) {
            if (
                error.message === ErrorMessage.NO_TOKEN_PRESENT ||
                error.message === ErrorMessage.TOKEN_EXPIRED ||
                error.message === ErrorMessage.TOKEN_INVALID) {
                console.warn(error.message);
                dispatch(setAuthError(ErrorMessage.INVALID_CREDENTIALS + ": " + error.message));
            } else {
                throw new Error(ErrorMessage.FAILED_TO_FETCH_USERS);
            }
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
                state.error = action.error.message || ErrorMessage.AN_ERROR_OCCURRED;
            })
    },
});

export default userSlice.reducer;
