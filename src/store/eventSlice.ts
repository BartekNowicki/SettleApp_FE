// eventSlice.ts
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Event} from "../model/Event.ts";
import API_BASE_URL from "../apiConfig.ts";

interface EventState {
    events: Event[];
    loading: boolean;
    error: string | null;
}

const initialState: EventState = {
    events: [],
    loading: false,
    error: null,
};

export const fetchEvents = createAsyncThunk<Event[], void>(
    'events/fetchEvents',
    async () => {
        try {
            const response = await axios.get<Event[]>(`${API_BASE_URL}/events`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch events');
        }
    }
);

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export default eventSlice.reducer;
