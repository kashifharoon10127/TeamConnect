import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

interface AuthState {
    user: UserState | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
    },
});

export const { setUser, setLoading, clearUser } = authSlice.actions;
export default authSlice.reducer;
