import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    isModerator: boolean;
    token: string | null;
    username: string | null; // Имя пользователя для отображения
    loading: boolean;
    error: string | null;
}

const tokenFromStorage = localStorage.getItem('token');

function decodeJwt(token: string): { username: string, is_moderator: boolean } | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            username: payload.username,
            is_moderator: payload.isModerator,
        };
    } catch (error) {
        return null;
    }
}

const initialState: AuthState = {
    isAuthenticated: !!tokenFromStorage,
    isModerator: tokenFromStorage ? decodeJwt(tokenFromStorage)?.is_moderator || false : false,
    token: tokenFromStorage,
    username: tokenFromStorage ? decodeJwt(tokenFromStorage)?.username || null : null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { login: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) throw new Error('Invalid credentials');

            const data = await response.json();
            return data; // API возвращает токен и, возможно, имя пользователя
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.username = null;
            state.isModerator = false;
            // Вызываем API для логаута
            fetch('/api/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        console.error('Ошибка при логауте на сервере');
                    }
                })
                .catch((error) => {
                    console.error('Ошибка сети при логауте:', error);
                });

            localStorage.removeItem('token'); // Удаляем токен
        },
        restoreSession: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.isModerator = decodeJwt(action.payload.token)?.is_moderator || false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.username = action.payload.username;
                state.isModerator = decodeJwt(action.payload.token)?.is_moderator || false;
                localStorage.setItem('token', action.payload.token); // Сохраняем токен
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;