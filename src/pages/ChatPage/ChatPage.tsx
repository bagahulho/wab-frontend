import React, { useCallback, useEffect, useState } from 'react';
import { Chats_Mock } from '../../modules/mock';
import { Chat } from '../../modules/types';
import { useParams } from 'react-router-dom';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import "./ChatPage.css";
import Header from "../../components/Header/Header";
import mock_img from "../../assets/defaultIcon.png"

const ChatPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [chat, setChat] = useState<Chat | null>(null);
    const [isMock, setIsMock] = useState(false);

    const createMocks = (name: string) => {
        setIsMock(true);
        const filteredChats = Chats_Mock.filter(chat =>
            chat.name.toLowerCase().includes(name.toLowerCase())
        );
        // Если чатов нет, установим null, иначе - первый подходящий чат
        setChat(filteredChats.length > 0 ? filteredChats[0] : null);
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`/api/chats/${id}`, { signal: AbortSignal.timeout(1000) });
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            if (!data || !data.ID || !data.Img) {
                throw new Error('Invalid data format');
            }

            const chatWithProperCase: Chat = {
                id: data.ID,
                img: data.Img,
                name: data.Name,
                info: data.Info,
                nickname: data.Nickname,
                friends: data.Friends,
                subscribers: data.Subscribers,
            };

            setChat(chatWithProperCase);
            setIsMock(false);
        } catch (error) {
            console.error('Error fetching chat:', error);
            if (!isMock) {
                createMocks('');  // Подаем пустую строку или другое значение для создания моков
            }
        }
    }, [id, isMock]);

    useEffect(() => {
        if (isMock) {
            const idNum = parseInt(id as string, 10);
            const mockChat = Chats_Mock.find(chat => chat?.id === idNum) as Chat;
            setChat(mockChat || null);
        } else {
            fetchData();
        }

        return () => {
            setChat(null);
        };
    }, [id, isMock, fetchData]);

    if (!chat) {
        return <div>Чат не найден</div>;
    }

    return (
        <><Header></Header>
            <div className="chat-page">
                <BreadCrumbs crumbs={[
                    { label: ROUTE_LABELS.CHATS, path: ROUTES.CHATS },
                    { label: chat.name }
                ]} />
                <div className="profile-container">
                    <div className="profile-image">
                        <img src={chat.img || mock_img} alt={chat.name} />
                    </div>
                    <div className="profile-details">
                        <h2>{chat.name}</h2>
                        <p><b>Имя пользователя:</b> {chat.nickname}</p>
                        <p><b>Друзья:</b> {chat.friends}</p>
                        <p><b>Подписчики:</b> {chat.subscribers}</p>
                        <p><b>Описание:</b> {chat.info}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;
