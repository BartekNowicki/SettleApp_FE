import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Event} from "../model/Event";
import API_BASE_URL from "../apiConfig";
import {RootState} from "./store";
import {setAuthError} from './authSlice';
import {validateTokenOrThrow} from "../security/tokenValidator";
import {ErrorMessage} from "../enums/ErrorMessage";
import {setAuthError} from "./authSlice.ts";

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

export const fetchEvents = createAsyncThunk<Event[], void, { state: RootState }>(
    'events/fetchEvents',
    async (_, {getState, dispatch}) => {

        try {
            const {token} = getState().auth;
            validateTokenOrThrow(token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get<Event[]>(`${API_BASE_URL}/events`, config);
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

const eventSlice = createSlice<EventState>({
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
                state.error = action.error.message || ErrorMessage.AN_ERROR_OCCURRED;
            })
    },
});

export default eventSlice.reducer;
