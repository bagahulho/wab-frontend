import React, { useState } from 'react';
import './ProfilePage.css';
import Header from "../../components/Header/Header.tsx";
import axiosInstance from "../../api/axiosInstance.ts";

const ProfilePage: React.FC = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setError('Новые пароли не совпадают.');
            return;
        }

        // Получаем токен из LocalStorage
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Токен авторизации отсутствует.');
            return;
        }

        axiosInstance.put('/user/update', {
            current_password: formData.currentPassword,
            new_password: formData.newPassword,
        }, {
            headers: {
                Authorization: token,
            },
        })
            .then(() => {
                setSuccess('Данные успешно обновлены.');
                setError(null);
            })
            .catch(() => {
                setError('Ошибка при обновлении данных. Проверьте введённые данные.');
                setSuccess(null);
            });
    };

    return (
        <>
            <Header />
            <div className="profile-page">
                <h1>Личный кабинет</h1>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <form className="profile-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Текущий пароль</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">Новый пароль</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтверждение нового пароля</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="submit-button">Сохранить изменения</button>
                </form>
            </div>
        </>
    );
};

export default ProfilePage;