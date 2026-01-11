import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
    id: string;
    senderId: string;
    senderName?: string;
    text: string;
    timestamp: number;
}

interface ChatState {
    activeContactId: string | null;
    recentMessages: Record<string, Message[]>;
}

const initialState: ChatState = {
    activeContactId: '1',
    recentMessages: {},
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveContact: (state, action: PayloadAction<string | null>) => {
            state.activeContactId = action.payload;
        },
        updateMessages: (state, action: PayloadAction<{ contactId: string; messages: Message[] }>) => {
            state.recentMessages[action.payload.contactId] = action.payload.messages;
        },
    },
});

export const { setActiveContact, updateMessages } = chatSlice.actions;
export default chatSlice.reducer;
