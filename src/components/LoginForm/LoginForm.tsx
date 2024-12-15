import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate
import { loginUser } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import './LoginForm.css';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Создаем навигатор
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [form, setForm] = useState({ login: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser(form));
        if (loginUser.fulfilled.match(resultAction)) {
            navigate('/'); // Перенаправляем на главную после успешного входа
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="login">Login</label>
                <input
                    type="text"
                    id="login"
                    name="login"
                    value={form.login}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;