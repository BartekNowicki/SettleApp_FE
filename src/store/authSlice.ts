import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    // Add other authentication-related state here
}

const initialState: AuthState = {
    token: null,
    // Initialize other state properties here
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        // Add other authentication-related reducers here
    },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
