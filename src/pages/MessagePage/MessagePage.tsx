import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./MessagePage.css";
import axiosInstance from "../../api/axiosInstance.ts";
import Header from "../../components/Header/Header.tsx";
import {ROUTE_LABELS, ROUTES} from "../../Routes.tsx";
import {BreadCrumbs} from "../../components/BreadCrumbs/BreadCrumbs.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

interface Chat {
    id: number;
    img: string;
    name: string;
    info: string;
    nickname: string;
    friends: number;
    subscribers: number;
    sound: boolean;
    is_read: boolean;
}

interface Message {
    id: number;
    status: string;
    text: string;
    date_create: string;
    date_update: string;
    date_finish: string;
    creator: string;
    chats: Chat[];
}

const MessagePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [message, setMessage] = useState<Message | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messageText, setMessageText] = useState<string>("");
    const { username } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axiosInstance.get(`/api/messages/${id}`);
                setMessage(response.data);
                setMessageText(response.data.text || "");
            } catch (err) {
                setError("Ошибка при загрузке сообщения. Попробуйте позже.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessage();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageText(e.target.value);
    };

    const handleSaveText = async () => {
        if (!message) return;
        try {
            const response = await axiosInstance.put(`/api/messages/${id}/text`, {
                text: messageText,
            });
            setMessage({ ...message, text: response.data.text });
        } catch (err) {
            console.log("Ошибка при обновлении текста сообщения");
        }
    };

    const handleToggleSound = async (chatId: number) => {
        if (!message) return;
        try {
            await axiosInstance.put(`/api/message-chats/switch/${message.id}/${chatId}`);
            setMessage({
                ...message,
                chats: message.chats.map((chat) =>
                    chat.id === chatId ? { ...chat, sound: !chat.sound } : chat
                ),
            });
        } catch (err) {
            console.log("Ошибка при переключении звука");
        }
    };
    const handleDeleteChat = async (chatId: number) => {
        if (!message) return;
        try {
            await axiosInstance.delete(`/api/message-chats/delete/${message.id}/${chatId}`);
            setMessage({
                ...message,
                chats: message.chats.filter(chat => chat.id !== chatId),
            });
        } catch (err) {
            console.log("Ошибка удаления чата");
        }
    };

    const handleFormMessage = async () => {
        if (!message) return;
        try {
            // Запрос на сервер для отправки сообщения
            await axiosInstance.put(`/api/messages/${id}/form`);
            console.log("Сообщение успешно отправлено");
            navigate("/messages"); // Перенаправляем пользователя на список сообщений
        } catch (err) {
            console.log("Ошибка при отправке сообщения. Возможно пустой текст");
        }
    };

    const handleDeleteMessage = async () => {
        if (!message) return;
        try {
            await axiosInstance.delete(`/api/messages/${id}/delete`);
            navigate("/messages");
        } catch (err) {
            console.log("Ошибка при удалении сообщения");
        }
    };

    if (isLoading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!message) {
        return <div className="loading">Сообщение не найдено</div>;
    }

    const isDraft = message.status === "черновик";

    return (
        <><Header></Header>
            <BreadCrumbs crumbs={[
                { label: ROUTE_LABELS.MESSAGES, path: ROUTES.MESSAGES },
                { label: message.id.toString() },
            ]} />
            <div className="container">
                <div className="input-bar">
                    <input
                        type="text"
                        name="message"
                        placeholder="Введите сообщение..."
                        value={messageText}
                        onChange={handleInputChange}
                        disabled={!isDraft || !(message.creator === username)}
                    />
                    {isDraft && (message.creator === username) && (
                        <button onClick={handleSaveText} className="save-button">
                            Сохранить текст
                        </button>
                    )}
                </div>

                <div className="message-content">
                    {message.chats && message.chats.length > 0 ?
                        (message.chats.map((chat) => (
                                <div className="contact-card" key={chat.id}>
                                    <Link to={`/chats/${chat.id}`} className="avatar">
                                        <img src={chat.img} alt="Avatar"/>
                                    </Link>
                                    <Link to={`/chats/${chat.id}`} className="contact-info">
                                        <h3>{chat.name}</h3>
                                        <p>{chat.info}</p>
                                    </Link>
                                    <div className="sound">
                                        <input
                                            type="checkbox"
                                            id={`sound-toggle-${chat.id}`}
                                            className="sound-checkbox"
                                            checked={chat.sound}
                                            onChange={() => handleToggleSound(chat.id)}
                                            disabled={!isDraft || !(message.creator === username)}
                                        />
                                        <label htmlFor={`sound-toggle-${chat.id}`}>
                                            <svg
                                                id="sound-on"
                                                className={`sound-icon sound-on ${chat.sound ? "visible" : "hidden"}`}
                                                width="40px"
                                                height="40px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.86607 7.00638H8.12819C7.29866 7.00638 6.47502 7.15311 5.69169 7.44046C4.32455 7.94197 3.32964 9.1935 3.10172 10.6985L3.0942 10.7481C2.9686 11.5775 2.9686 12.4225 3.0942 13.2519L3.10172 13.3015C3.32964 14.8065 4.32455 16.058 5.69169 16.5595C6.47502 16.8469 7.29866 16.9936 8.12819 16.9936H8.86607C9.31092 16.9936 9.73726 17.1811 10.0499 17.5142L10.5914 18.091C12.1879 19.7918 14.938 18.9873 15.4719 16.6633C16.176 13.5986 16.176 10.4014 15.4719 7.33668C14.938 5.01271 12.1879 4.20823 10.5914 5.90899L10.0499 6.48581C9.73726 6.81891 9.31092 7.00638 8.86607 7.00638Z"
                                                    stroke="#363853" strokeWidth="1.5"/>
                                                <path
                                                    d="M19 7C20.7934 7.99804 22 9.86346 22 12C22 14.1365 20.7934 16.002 19 17"
                                                    stroke="#0095FF" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round"/>
                                                <path
                                                    d="M18.5 10C19.0978 10.3992 19.5 11.1454 19.5 12C19.5 12.8546 19.0978 13.6008 18.5 14"
                                                    stroke="#0095FF" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round"/>
                                            </svg>
                                            <svg
                                                id="sound-off"
                                                className={`sound-icon sound-off ${chat.sound ? "hidden" : "visible"}`}
                                                width="40px"
                                                height="40px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M7.86607 7.00638H7.12819C6.29866 7.00638 5.47502 7.15311 4.69169 7.44046C3.32455 7.94197 2.32964 9.1935 2.10172 10.6985L2.0942 10.7481C1.9686 11.5775 1.9686 12.4225 2.0942 13.2519L2.10172 13.3015C2.32964 14.8065 3.32455 16.058 4.69169 16.5595C5.47502 16.8469 6.29866 16.9936 7.12819 16.9936H7.86607C8.31092 16.9936 8.73726 17.1811 9.04993 17.5142L9.59139 18.091C11.1879 19.7918 13.938 18.9873 14.4719 16.6633C15.176 13.5986 15.176 10.4014 14.4719 7.33668C13.938 5.01271 11.1879 4.20823 9.59138 5.90899L9.04993 6.48581C8.73726 6.81891 8.31092 7.00638 7.86607 7.00638Z"
                                                    stroke="#363853" strokeWidth="1.5"/>
                                                <path d="M22 10L18 14M22 14L18 10" stroke="#0095FF" strokeWidth="1.5"
                                                      strokeLinecap="round"/>
                                            </svg>
                                        </label>
                                    </div>
                                    {!isDraft && chat.is_read && (
                                        <div className="delete-chat">
                                            <label htmlFor={`delete-chat-btn-${chat.id}`}>
                                                <svg
                                                    id="delete-chat"
                                                    className={`delete-chat-icon`}
                                                    width="40px"
                                                    height="40px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M18 7L9.42857 17L6 13" stroke="#0095FF" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M18 7L11.767 14.2718" stroke="#363853" stroke-width="1.5"
                                                          stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </label>
                                        </div>
                                    )}
                                    {!isDraft && !chat.is_read && (
                                        <div className="delete-chat">
                                            <label htmlFor={`delete-chat-btn-${chat.id}`}>
                                                <svg
                                                    id="delete-chat"
                                                    className={`delete-chat-icon`}
                                                    width="40px"
                                                    height="40px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                                        stroke="#363853" stroke-width="1.5"/>
                                                    <path
                                                        d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                                        stroke="#363853" stroke-width="1.5"/>
                                                    <path
                                                        d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                                        stroke="#0095FF" stroke-width="1.5"/>
                                                </svg>
                                            </label>
                                        </div>
                                    )}
                                    {isDraft && (message.creator === username) && (
                                        <>
                                            <div className="delete-chat">
                                                <input
                                                    type="checkbox"
                                                    id={`delete-chat-btn-${chat.id}`}
                                                    className="sound-checkbox"
                                                    onChange={() => handleDeleteChat(chat.id)}/>
                                                <label htmlFor={`delete-chat-btn-${chat.id}`}>
                                                    <svg
                                                        id="delete-chat"
                                                        className={`delete-chat-icon`}
                                                        width="40px"
                                                        height="40px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95044C4.00437 6.17301 6.173 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288Z"
                                                            stroke="#0095FF" strokeWidth="1.5"/>
                                                        <path
                                                            d="M15.0496 3.35288C13.0437 2.88237 10.9563 2.88237 8.95043 3.35288C6.173 4.00437 4.00437 6.17301 3.35288 8.95044C2.88237 10.9563 2.88237 13.0437 3.35288 15.0496C4.00437 17.827 6.17301 19.9956 8.95044 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496"
                                                            stroke="#363853" strokeWidth="1.5" strokeLinecap="round"/>
                                                        <path
                                                            d="M13.7678 10.2322L10.2322 13.7677M13.7678 13.7677L10.2322 10.2322"
                                                            stroke="#0095FF" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                </label>
                                            </div>
                                        </>
                                    )}
                                </div>))
                        ) : (
                            <div className="empty-message">Тут пусто</div>
                        )
                    }
                </div>
                <div className="bottom-buttons">
                    {isDraft && (message.creator === username) && (message.chats.length > 0) && (
                        <div className="form-btn-container">
                            <button type="button" className="form-btn" onClick={handleFormMessage}>
                                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15.5L12 8.5M12 8.5L9.5 11M12 8.5L14.5 11" stroke="#0095FF"
                                          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path
                                        d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35287C10.9563 2.88237 13.0437 2.88237 15.0496 3.35287C17.827 4.00437 19.9956 6.17301 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z"
                                        stroke="#0095FF" strokeWidth="1.5"/>
                                    <path
                                        d="M3.35288 8.95043C2.88237 10.9563 2.88237 13.0437 3.35288 15.0496C4.00437 17.827 6.17301 19.9956 8.95044 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C21.1176 13.0437 21.1176 10.9563 20.6471 8.95043C19.9956 6.17301 17.827 4.00437 15.0496 3.35287"
                                        stroke="#363853" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    )}

                    {isDraft && (message.creator === username) && (
                        <div className="delete-btn-container">
                            <button type="button" className="delete-btn" onClick={handleDeleteMessage}>
                                <svg
                                    width="50px"
                                    height="50px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.84254 5.48939L8.52333 5.80406L7.84254 5.48939ZM8.81802 4.18112L8.31749 3.62258L8.31749 3.62258L8.81802 4.18112ZM10.2779 3.30696L10.5389 4.01009L10.2779 3.30696ZM13.7221 3.30696L13.9831 2.60384V2.60384L13.7221 3.30696ZM16.1575 5.48939L16.8383 5.17471L16.1575 5.48939ZM8.25 7.03259C8.25 6.61367 8.34194 6.19649 8.52333 5.80406L7.16175 5.17471C6.89085 5.76079 6.75 6.39238 6.75 7.03259H8.25ZM8.52333 5.80406C8.70487 5.41133 8.97357 5.04881 9.31855 4.73966L8.31749 3.62258C7.82675 4.06235 7.43251 4.58893 7.16175 5.17471L8.52333 5.80406ZM9.31855 4.73966C9.66369 4.43037 10.0778 4.18126 10.5389 4.01009L10.0169 2.60384C9.38616 2.83798 8.80808 3.18295 8.31749 3.62258L9.31855 4.73966ZM10.5389 4.01009C11.0001 3.8389 11.4968 3.75 12 3.75V2.25C11.3213 2.25 10.6477 2.36972 10.0169 2.60384L10.5389 4.01009ZM12 3.75C12.5032 3.75 12.9999 3.8389 13.4611 4.01009L13.9831 2.60384C13.3523 2.36972 12.6787 2.25 12 2.25V3.75ZM13.4611 4.01009C13.9222 4.18126 14.3363 4.43037 14.6815 4.73966L15.6825 3.62258C15.1919 3.18295 14.6138 2.83798 13.9831 2.60384L13.4611 4.01009ZM14.6815 4.73966C15.0264 5.04881 15.2951 5.41133 15.4767 5.80406L16.8383 5.17471C16.5675 4.58893 16.1733 4.06235 15.6825 3.62258L14.6815 4.73966ZM15.4767 5.80406C15.6581 6.19649 15.75 6.61367 15.75 7.03259H17.25C17.25 6.39238 17.1092 5.7608 16.8383 5.17471L15.4767 5.80406Z"
                                        fill="#0095FF"/>
                                    <path
                                        d="M3 6.28259C2.58579 6.28259 2.25 6.61838 2.25 7.03259C2.25 7.44681 2.58579 7.78259 3 7.78259V6.28259ZM21 7.78259C21.4142 7.78259 21.75 7.44681 21.75 7.03259C21.75 6.61838 21.4142 6.28259 21 6.28259V7.78259ZM5 7.03259V6.28259H4.25V7.03259H5ZM19 7.03259H19.75V6.28259H19V7.03259ZM18.3418 16.8303L19.0624 17.0383L18.3418 16.8303ZM13.724 20.8553L13.8489 21.5949L13.724 20.8553ZM10.276 20.8553L10.401 20.1158L10.401 20.1158L10.276 20.8553ZM10.1183 20.8287L9.9933 21.5682L9.9933 21.5682L10.1183 20.8287ZM5.65815 16.8303L4.93757 17.0383L5.65815 16.8303ZM13.8817 20.8287L13.7568 20.0892L13.8817 20.8287ZM3 7.78259H21V6.28259H3V7.78259ZM13.7568 20.0892L13.599 20.1158L13.8489 21.5949L14.0067 21.5682L13.7568 20.0892ZM10.401 20.1158L10.2432 20.0892L9.9933 21.5682L10.151 21.5949L10.401 20.1158ZM18.25 7.03259V12.1758H19.75V7.03259H18.25ZM5.75 12.1759V7.03259H4.25V12.1759H5.75ZM18.25 12.1758C18.25 13.6806 18.0383 15.1776 17.6212 16.6223L19.0624 17.0383C19.5185 15.4583 19.75 13.8212 19.75 12.1758H18.25ZM13.599 20.1158C12.5404 20.2947 11.4596 20.2947 10.401 20.1158L10.151 21.5949C11.3751 21.8017 12.6248 21.8017 13.8489 21.5949L13.599 20.1158ZM10.2432 20.0892C8.40523 19.7786 6.90157 18.4335 6.37873 16.6223L4.93757 17.0383C5.61878 19.3981 7.58166 21.1607 9.9933 21.5682L10.2432 20.0892ZM6.37873 16.6223C5.9617 15.1776 5.75 13.6806 5.75 12.1759H4.25C4.25 13.8212 4.48148 15.4583 4.93757 17.0383L6.37873 16.6223ZM14.0067 21.5682C16.4183 21.1607 18.3812 19.3981 19.0624 17.0383L17.6212 16.6223C17.0984 18.4335 15.5947 19.7786 13.7568 20.0892L14.0067 21.5682ZM5 7.78259H19V6.28259H5V7.78259Z"
                                        fill="#363853"/>
                                    <path d="M10 12V16M14 12V16" stroke="#0095FF" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MessagePage;