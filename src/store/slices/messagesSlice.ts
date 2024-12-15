import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

interface Message {
    id: number;
    status: string;
    text: string;
    date_create: string;
    date_update: string;
    date_finish: string;
    creator: string;
}

interface MessagesState {
    messages: Message[];
    loading: boolean;
    error: string | null;
}

const initialState: MessagesState = {
    messages: [],
    loading: false,
    error: null,
};

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async (filters: { status?: string; start_date?: string; end_date?: string }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams(filters as Record<string, string>);
            const response = await axiosInstance.get(`/api/messages?${params.toString()}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const confirmMessage = createAsyncThunk(
    'messages/confirmMessage',
    async (id: number, { rejectWithValue }) => {
        try {
            await axiosInstance.post(`/api/messages/${id}/form`);
            return id; // Возвращаем ID подтвержденного сообщения
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(confirmMessage.fulfilled, (state, action) => {
                const index = state.messages.findIndex((msg) => msg.id === action.payload);
                if (index !== -1) {
                    state.messages[index].status = 'завершён';
                }
            });
    },
});

export default messagesSlice.reducer;