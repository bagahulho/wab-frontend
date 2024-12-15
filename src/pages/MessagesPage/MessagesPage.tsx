import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './MessagesPage.css';
import Header from "../../components/Header/Header.tsx";
import {ROUTE_LABELS, ROUTES} from "../../Routes.tsx";
import {BreadCrumbs} from "../../components/BreadCrumbs/BreadCrumbs.tsx";
import {Configuration, DsMessageWithUsers, MessagesApi} from "../../api";
import {RootState} from "../../store";

const MessagesPage: React.FC = () => {
    const { isModerator } = useSelector((state: RootState) => state.auth);

    const [messages, setMessages] = useState<DsMessageWithUsers[]>([]);
    const [allMessages, setAllMessages] = useState<DsMessageWithUsers[]>([]); // Все сообщения
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        status: '',
        startDate: '',
        endDate: '',
        username: '',
    });

    const api = new MessagesApi(
        new Configuration({
            apiKey: async () => `Bearer ${localStorage.getItem("token")}`,
            basePath: '/api',
        })
    );

    const fetchRequests = async () => {
        try {
            const response = await api.messagesGet({
                status: filters.status,
                startDate: filters.startDate,
                endDate: filters.endDate,
            });
            setAllMessages(response); // Сохраняем все сообщения
            setMessages(filterByUsername(response, filters.username)); // Применяем фильтр по имени
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
        // return messages.filter((message) =>
        //     message.creator?.username?.toLowerCase().includes(username.toLowerCase())
        // );
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

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };


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
                            {isModerator && (
                                <option value="удалён">удалён</option>
                            )}
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
                                {isModerator && (
                                    <>
                                        <td>{message.creator}</td>
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