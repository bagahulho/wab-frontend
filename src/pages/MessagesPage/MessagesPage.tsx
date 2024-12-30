import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './MessagesPage.css';
import Header from "../../components/Header/Header.tsx";
import {ROUTE_LABELS, ROUTES} from "../../Routes.tsx";
import {BreadCrumbs} from "../../components/BreadCrumbs/BreadCrumbs.tsx";
import {Configuration, DsMessageWithUsers, MessagesApi} from "../../api";
import {RootState} from "../../store";
import {
    setEndDate,
    setStartDate,
    setStatus,
    setUsername
} from "../../store/slices/messagesFilterSlice.ts";

interface DsMessageWithRead extends DsMessageWithUsers {
    isRead?: boolean; // Новое поле
}

const MessagesPage: React.FC = () => {
    const { isModerator } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [messages, setMessages] = useState<DsMessageWithRead[]>([]);
    const [allMessages, setAllMessages] = useState<DsMessageWithUsers[]>([]); // Все сообщения
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const filters = useSelector((state: RootState) => state.messagesFilter);

    const api = new MessagesApi(
        new Configuration({
            apiKey: async () => `Bearer ${localStorage.getItem("token")}`,
            basePath: '/api',
        })
    );

    const fetchRequests = async () => {
        try {
            const baseMessages = await api.messagesGet({
                status: filters.status,
                startDate: filters.startDate,
                endDate: filters.endDate,
            });

            const messagesWithRead: DsMessageWithRead[] = await Promise.all(
                baseMessages.map(async (msg) => {
                    const detail = await api.messagesIdGet({ id: msg.id });

                    const anyRead = detail.chats?.some((chat) => chat.isRead === true);

                    return {
                        ...msg,
                        isRead: Boolean(anyRead),
                    };
                })
            );

            setAllMessages(messagesWithRead);
            setMessages(filterByUsername(messagesWithRead, filters.username));
            setError(null);
        } catch (err) {
            console.error("Ошибка загрузки заявок:", err);
            setError("Не удалось загрузить заявки. Попробуйте позже.");
        }
    };

    const filterByUsername = (messages: DsMessageWithUsers[], username: string) => {
        if (!isModerator || !username) {
            return messages;
        }
        return messages.filter((message) =>
            message.creator?.toLowerCase().includes(username.toLowerCase())
        );
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'status':
                dispatch(setStatus(value));
                break;
            case 'startDate':
                dispatch(setStartDate(value));
                break;
            case 'endDate':
                dispatch(setEndDate(value));
                break;
            case 'username':
                dispatch(setUsername(value));
                break;
            default:
                break;
        }
    };

    const updateStatus = async (id: number, status: string) => {
        try {
            switch (status) {
                case "approved":
                    await api.messagesIdFinishPut({ id });
                    break;
                case "rejected":
                    await api.messagesIdRejectPut({ id });
                    break;
                default:
                    throw new Error("Неверный статус");
            }
            await fetchRequests(); // Перезагрузка заявок после обновления статуса
        } catch (err) {
            console.error("Ошибка обновления статуса:", err);
            setError("Не удалось обновить статус. Попробуйте позже.");
        }
    };

    useEffect(() => {
        fetchRequests(); // Первичная загрузка
        const interval = setInterval(fetchRequests, 5000); // Обновление каждые 5 секунд
        return () => clearInterval(interval); // Очистка таймера
    }, [filters]); // Без фильтрации по username, чтобы не перезапрашивать данные


    const handleRowClick = (id: number) => {
        navigate(`/messages/${id}`); // Перенаправление на страницу сообщения
    };

    return (
        <><Header></Header>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.MESSAGES, path: ROUTES.MESSAGES }]} />
            <div className="messages-page">
                <form className="messages-filters">
                    <div className="filter-group">
                        <label htmlFor="status">Статус</label>
                        <select
                            id="status"
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >
                            <option value="">все</option>
                            <option value="черновик">черновик</option>
                            <option value="сформирован">сформирован</option>
                            <option value="отклонён">отклонён</option>
                            <option value="завершён">завершён</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="startDate">От</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}/>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="endDate">До</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}/>
                    </div>
                    {isModerator && (
                        <div className="filter-group">
                            <label htmlFor="username">Создатель</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={filters.username}
                                onChange={handleFilterChange}
                                placeholder="Введите имя пользователя" />
                        </div>
                    )}
                </form>

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
                        {isModerator && (
                            <>
                                <th>Создатель</th>
                                <th>Прочитано</th>
                                <th>Действия</th>
                            </>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <tr
                                key={message.id}
                            >
                                <td className="clickable-row"
                                    onClick={() => handleRowClick(message.id)}>{message.id}</td>
                                <td className="clickable-row"
                                    onClick={() => handleRowClick(message.id)}>
                                    {message.status}
                                </td>
                                <td className="clickable-row"
                                    onClick={() => handleRowClick(message.id)}>{message.text}</td>
                                <td className="clickable-row"
                                    onClick={() => handleRowClick(message.id)}>{new Date(message.dateCreate).toLocaleString()}</td>
                                <td className="clickable-row"
                                    onClick={() => handleRowClick(message.id)}>
                                    {message.dateUpdate !== '0001-01-01T00:00:00Z'
                                        ? new Date(message.dateUpdate).toLocaleString()
                                        : ''}
                                </td>
                                <td className="clickable-row"
                                    onClick={() => handleRowClick(message.id)}>
                                    {message.dateFinish !== '0001-01-01T00:00:00Z'
                                        ? new Date(message.dateFinish).toLocaleString()
                                        : ''}
                                </td>
                                {isModerator && (
                                    <>
                                        <td className="clickable-row"
                                            onClick={() => handleRowClick(message.id)}>{message.creator}</td>
                                        <td>{message.isRead ? "Да" : "Нет"}</td>
                                        <td>{message.status === 'сформирован'
                                            ? <div className="status-buttons">
                                                <button className="status-button" onClick={() => updateStatus(message.id!, "approved")}>
                                                    Одобрить
                                                </button>
                                                <button className="status-button" onClick={() => updateStatus(message.id!, "rejected")}>
                                                    Отклонить
                                                </button>
                                            </div> : "-"}
                                        </td>
                                    </>
                                )}
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