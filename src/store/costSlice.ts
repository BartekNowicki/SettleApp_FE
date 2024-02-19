import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Cost} from "../model/Cost.ts";
import API_BASE_URL from '../apiConfig.ts';

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

export const fetchCosts = createAsyncThunk<Cost[], void>(
    'costs/fetchCosts',
    async () => {
        try {
            const response = await axios.get<Cost[]>(`${API_BASE_URL}/costs`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch costs');
        }
    }
);

const costSlice = createSlice({
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
