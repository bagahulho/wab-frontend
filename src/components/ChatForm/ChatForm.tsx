import React, { useState, useEffect } from 'react';
import './ChatForm.css';

interface ChatFormProps {
    initialData?: {
        id?: number;
        name: string;
        info: string;
        nickname: string;
    };
    onSave: (data: { name: string; info: string; nickname: string; image?: File }) => void;
    onCancel: () => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        info: '',
        nickname: '',
        image: null as File | null,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                info: initialData.info,
                nickname: initialData.nickname,
                image: null,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name: formData.name,
            info: formData.info,
            nickname: formData.nickname,
            image: formData.image || undefined,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="chat-form">
            <div>
                <label>Имя:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Описание:</label>
                <textarea
                    name="info"
                    value={formData.info}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Никнейм:</label>
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Аватарка:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">Сохранить</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Отмена</button>
            </div>
        </form>
    );
};

export default ChatForm;