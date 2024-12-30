import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import regReducer from "./slices/regSlice.ts";
import authReducer from "./slices/authSlice.ts";
import messagesReducer from "./slices/messagesSlice.ts";
import messagesFilterReducer from "./slices/messagesFilterSlice.ts";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        filter: filterReducer,
        reg: regReducer,
        auth: authReducer,
        messages: messagesReducer,
        messagesFilter: messagesFilterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;