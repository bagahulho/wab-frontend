import React, { useEffect, useState } from "react";
import "./ServicesPage.css";
import { Configuration, ChatsApi, DsChat, DsChatRequest } from "../../api";
import Header from "../../components/Header/Header.tsx";
import mock_img from "../../assets/defaultIcon.png";
import {useNavigate} from "react-router-dom";

const ServicesPage: React.FC = () => {
    const [services, setServices] = useState<DsChat[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const api = new ChatsApi(
        new Configuration({
            apiKey: async () => `Bearer ${localStorage.getItem("token")}`,
            basePath: "/api",
        })
    );

    const fetchServices = async () => {
        try {
            const response = await api.chatsGet();
            setServices(response.chats || []);
            setError(null);
        } catch (err) {
            console.error("Ошибка загрузки чата:", err);
            setError("Не удалось загрузить чата.");
        }
    };

    // const handleAddService = async () => {
    //     if (!newService.name?.trim()) {
    //         setError("Имя и псевдоним обязательны.");
    //         return;
    //     }
    //     try {
    //         await api.chatsCreatePost({ chat: newService });
    //         setNewService({ name: "", info: "", nickname: "" });
    //         fetchServices();
    //     } catch (err) {
    //         console.error("Ошибка добавления чата:", err);
    //         setError("Не удалось добавить чат.");
    //     }
    // };

    // const handleEditService = async () => {
    //     if (!editService || !editService.name?.trim()) {
    //         setError("Имя и псевдоним обязательны.");
    //         return;
    //     }
    //
    //     try {
    //         // 1. Редактирование чата
    //         await api.chatsIdPut({
    //             id: editService.id!,
    //             chat: {
    //                 name: editService.name,
    //                 info: editService.info,
    //                 nickname: editService.nickname,
    //             },
    //         });
    //
    //         // 2. Загрузка изображения (если выбран файл)
    //         if (selectedFile) {
    //             const formData = new FormData();
    //             formData.append("image", selectedFile);
    //
    //             await api.chatsIdNewImagePost({ id: editService.id!, image: selectedFile });
    //             setSelectedFile(null);
    //         }
    //
    //         // Сброс состояния
    //         setEditService(null);
    //         setError(null);
    //
    //         // Перезагрузка списка услуг
    //         fetchServices();
    //     } catch (err) {
    //         console.error("Ошибка сохранения услуги:", err);
    //         setError("Не удалось сохранить изменения.");
    //     }
    // };

    // Delete service
    const handleDeleteService = async (id: number) => {
        try {
            await api.chatsIdDelete({ id });
            fetchServices();
        } catch (err) {
            console.error("Ошибка удаления чата:", err);
            setError("Не удалось удалить чат.");
        }
    };

    const handleEdit = (id: number) => {
        navigate(`/chats/edit/${id}`);
    };

    // Переход на страницу добавления
    const handleAdd = () => {
        navigate(`/chats/add`);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <><Header></Header>
            <div className="services-page">
                <h1>Управление чатами</h1>
                {error && <div className="error">{error}</div>}

                <table className="services-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Аватарка</th>
                        <th>Имя</th>
                        <th>Описание</th>
                        <th>Псевдоним</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td className="image-replace">
                                <img
                                    src={service.img || mock_img}
                                    alt="Аватар"
                                    className="chat-avatar"
                                />
                            </td>
                            <td>
                                {service.name}
                            </td>
                            <td>
                                {service.info}
                            </td>
                            <td>
                                {service.nickname}
                            </td>
                            <td>
                                    <>
                                        <button className="service-button"
                                                onClick={() => handleEdit(service.id!)}>Редактировать
                                        </button>
                                        <button className="service-button"
                                                onClick={() => handleDeleteService(service.id!)}>Удалить
                                        </button>
                                    </>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="add-service-form">
                    <button onClick={handleAdd}>Добавить</button>
                </div>
            </div>
        </>
    );
};

export default ServicesPage;