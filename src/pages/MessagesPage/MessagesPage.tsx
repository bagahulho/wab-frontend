import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MessagesPage.css';
import Header from "../../components/Header/Header.tsx";
import {ROUTE_LABELS, ROUTES} from "../../Routes.tsx";
import {BreadCrumbs} from "../../components/BreadCrumbs/BreadCrumbs.tsx";
import {Configuration, DsMessageWithUsers, MessagesApi} from "../../api";

const MessagesPage: React.FC = () => {
    const [messages, setMessages] = useState<DsMessageWithUsers[]>([]);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const api = new MessagesApi(
        new Configuration({
            apiKey: async () => `Bearer ${localStorage.getItem("token")}`,
            basePath: '/api',
        })
    );

    const fetchRequests = async () => {
        try {
            const response = await api.messagesGet({});
            setMessages(response);
            setError(null);
        } catch (err) {
            console.error("Ошибка загрузки заявок:", err);
            setError("Не удалось загрузить заявки. Попробуйте позже.");
        }
    };

    useEffect(() => {
        fetchRequests(); // Первичная загрузка
        const interval = setInterval(fetchRequests, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleRowClick = (id: number) => {
        navigate(`/messages/${id}`); // Перенаправление на страницу сообщения
    };

    return (
        <><Header></Header>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.MESSAGES, path: ROUTES.MESSAGES }]} />
            <div className="messages-page">
                {error && <div className="error">{error}</div>}

                <table className="messages-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Статус</th>
                        <th>Текст</th>
                        <th>Дата создания</th>
                        <th>Дата обновления</th>
                        <th>Дата завершения</th>
                    </tr>
                    </thead>
                    <tbody>
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <tr
                                key={message.id}
                                className="clickable-row"
                                onClick={() => handleRowClick(message.id)}
                            >
                                <td>{message.id}</td>
                                <td>
                                    {message.status}
                                </td>
                                <td>{message.text}</td>
                                <td>{new Date(message.dateCreate).toLocaleString()}</td>
                                <td>
                                    {message.dateUpdate !== '0001-01-01T00:00:00Z'
                                        ? new Date(message.dateUpdate).toLocaleString()
                                        : ''}
                                </td>
                                <td>
                                    {message.dateFinish !== '0001-01-01T00:00:00Z'
                                        ? new Date(message.dateFinish).toLocaleString()
                                        : ''}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>Нет сообщений для отображения.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MessagesPage;