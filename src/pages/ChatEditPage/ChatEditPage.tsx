import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatForm from '../../components/ChatForm/ChatForm';
import Header from '../../components/Header/Header';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../Routes';
import { Configuration, ChatsApi, DsChatRequest } from '../../api';

const ChatEditPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [chatData, setChatData] = useState<DsChatRequest | null>(null);
    const [error, setError] = useState<string | null>(null);

    const api = new ChatsApi(
        new Configuration({
            apiKey: async () => `Bearer ${localStorage.getItem('token')}`,
            basePath: '/api',
        })
    );

    useEffect(() => {
        const fetchChatData = async () => {
            if (id) {
                try {
                    const response = await api.chatsIdGet({ id: parseInt(id) });
                    setChatData({
                        name: response.name || '',
                        info: response.info || '',
                        nickname: response.nickname || '',
                    });
                } catch (err) {
                    console.error('Ошибка загрузки данных чата:', err);
                    setError('Не удалось загрузить данные чата.');
                }
            }
        };

        fetchChatData();
    }, [id]);

    const handleSave = async (data: { name: string; info: string; nickname: string; image?: File }) => {
        try {
            if (id) {
                await api.chatsIdPut({
                    id: parseInt(id),
                    chat: {
                        name: data.name,
                        info: data.info,
                        nickname: data.nickname,
                    },
                });
            } else {
                await api.chatsCreatePost({
                    chat: {
                        name: data.name,
                        info: data.info,
                        nickname: data.nickname,
                    },
                });
            }

            if (data.image) {
                await api.chatsIdNewImagePost({
                    id: id ? parseInt(id) : 0,
                    image: data.image,
                });
            }

            navigate('/recipient-chats');
        } catch (err) {
            console.error('Ошибка сохранения чата:', err);
            setError('Не удалось сохранить чат.');
        }
    };

    const handleCancel = () => {
        navigate('/recipient-chats');
    };

    return (
        <>
            <Header />
            <BreadCrumbs
                crumbs={[
                    { label: ROUTE_LABELS.CHATS, path: ROUTES.CHATS },
                    { label: id ? 'Редактирование чата' : 'Добавление чата', path: '' },
                ]}
            />
            <div className="chat-edit-page">
                <h1>{id ? 'Редактирование чата' : 'Добавление чата'}</h1>
                {error && <div className="error">{error}</div>}
                <ChatForm initialData={chatData || undefined} onSave={handleSave} onCancel={handleCancel} />
            </div>
        </>
    );
};

export default ChatEditPage;