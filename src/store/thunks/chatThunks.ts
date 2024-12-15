import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchChat = createAsyncThunk(
    'chat/fetchChat',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/chats/${id}`);
            return response.data; // Ответ API с данными чата
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);