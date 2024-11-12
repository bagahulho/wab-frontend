import React, { useEffect, useState } from 'react';
import { Chats_Mock } from '../../modules/mock';
import { Chat } from '../../modules/types';
import { useParams } from 'react-router-dom';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import "./ChatPage.css";

const ChatPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [chat, setChat] = useState<Chat | null>(null);
    const [isMock, setIsMock] = useState(false);

    const fetchData = async () => {
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
                subscribers: data.Subscribers
            };

            setChat(chatWithProperCase);
        } catch (error) {
            console.error('Fetch error or invalid data:', error);
            setIsMock(true);
        }
    };

    useEffect(() => {
        if (isMock) {
            const idNum = parseInt(id as string, 10);
            const mockChat = Chats_Mock.find(chat => chat?.id === idNum) as Chat;
            setChat(mockChat);
        } else {
            fetchData();
        }

        return () => {
            setChat(null);
        };
    }, [id, isMock]);

    if (!chat) {
        return <div>Активность не найдена</div>;
    }

    // const crumbs = [
    //     { label: ROUTE_LABELS.CHATS, path: ROUTES.CHATS },
    //     { label: chat.name }
    // ];

    return (
        <div className="chat-page">
            <BreadCrumbs crumbs={[
                { label: ROUTE_LABELS.CHATS, path: ROUTES.CHATS },
                { label: chat.name }
            ]} />
            <div className="profile-container">
                <div className="profile-image">
                    <img src={chat.img} alt={chat.name} />
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
    );
};

export default ChatPage;
