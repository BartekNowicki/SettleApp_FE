import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Cost} from "../model/Cost";
import API_BASE_URL from '../apiConfig';
import {RootState} from "./store";
import {setAuthError} from './authSlice';
import {validateTokenOrThrow} from "../security/tokenValidator";
import {ErrorMessage} from "../enums/ErrorMessage";
import {setAuthError} from "./authSlice.ts";

interface CostState {
    costs: Cost[];
    loading: boolean;
    error: string | null;
}

const initialState: CostState = {
    costs: [],
    loading: false,
    error: null,
};

export const fetchCosts = createAsyncThunk<Cost[], void, { state: RootState }>(
    'costs/fetchCosts',
    async (_, {getState, dispatch}) => {

        try {
            const {token} = getState().auth;
            validateTokenOrThrow(token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get<Cost[]>(`${API_BASE_URL}/costs`, config);
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

const costSlice = createSlice<CostState>({
    name: 'cost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCosts.fulfilled, (state, action) => {
                state.loading = false;
                state.costs = action.payload;
            })
            .addCase(fetchCosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || ErrorMessage.AN_ERROR_OCCURRED;
            });
    },
});

export default costSlice.reducer;
