import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessagesFilterState {
    status: string;
    startDate: string;
    endDate: string;
    username: string;
}

const initialState: MessagesFilterState = {
    status: '',
    startDate: '',
    endDate: '',
    username: '',
};

const messagesFilterSlice = createSlice({
    name: 'messagesFilter',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<string>) {
            state.status = action.payload;
        },
        setStartDate(state, action: PayloadAction<string>) {
            state.startDate = action.payload;
        },
        setEndDate(state, action: PayloadAction<string>) {
            state.endDate = action.payload;
        },
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        resetFilters(state) {
            state.status = '';
            state.startDate = '';
            state.endDate = '';
            state.username = '';
        },
    },
});

export const { setStatus, setStartDate, setEndDate, setUsername, resetFilters } = messagesFilterSlice.actions;
export default messagesFilterSlice.reducer;