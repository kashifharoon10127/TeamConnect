import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CallStatus = 'idle' | 'ringing' | 'connected' | 'ended';

interface CallState {
    status: CallStatus;
    recipientId: string | null;
    recipientName: string | null;
    startTime: number | null;
}

const initialState: CallState = {
    status: 'idle',
    recipientId: null,
    recipientName: null,
    startTime: null,
};

const callSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {
        initiateCall: (state, action: PayloadAction<{ id: string; name: string }>) => {
            state.status = 'ringing';
            state.recipientId = action.payload.id;
            state.recipientName = action.payload.name;
            state.startTime = null;
        },
        connectCall: (state) => {
            state.status = 'connected';
            state.startTime = Date.now();
        },
        endCall: (state) => {
            state.status = 'ended';
            state.startTime = null;
        },
        resetCall: (state) => {
            state.status = 'idle';
            state.recipientId = null;
            state.recipientName = null;
            state.startTime = null;
        },
    },
});

export const { initiateCall, connectCall, endCall, resetCall } = callSlice.actions;
export default callSlice.reducer;
