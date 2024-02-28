import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Cost} from "../model/Cost.ts";
import API_BASE_URL from '../apiConfig.ts';
import {RootState} from "./store.ts";

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
    async (_, {getState}) => {
        try {
            const token = getState().auth.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get<Cost[]>(`${API_BASE_URL}/costs`, config);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch costs');
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
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export default costSlice.reducer;
