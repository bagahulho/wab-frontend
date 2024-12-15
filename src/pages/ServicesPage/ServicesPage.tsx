import React, { useEffect, useState } from "react";
import "./ServicesPage.css";
import { Configuration, ChatsApi, DsChat, DsChatRequest } from "../../api";
import Header from "../../components/Header/Header.tsx";
import mock_img from "../../assets/defaultIcon.png";

const ServicesPage: React.FC = () => {
    const [services, setServices] = useState<DsChat[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newService, setNewService] = useState<DsChatRequest>({
        name: "",
        info: "",
        nickname: "",
    });
    const [editService, setEditService] = useState<DsChat | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Для загрузки изображения

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

    const handleAddService = async () => {
        if (!newService.name?.trim()) {
            setError("Имя и псевдоним обязательны.");
            return;
        }
        try {
            await api.chatsCreatePost({ chat: newService });
            setNewService({ name: "", info: "", nickname: "" });
            fetchServices();
        } catch (err) {
            console.error("Ошибка добавления чата:", err);
            setError("Не удалось добавить чат.");
        }
    };

    const handleEditService = async () => {
        if (!editService || !editService.name?.trim()) {
            setError("Имя и псевдоним обязательны.");
            return;
        }
        try {
            await api.chatsIdPut({
                id: editService.id!,
                chat: {
                    name: editService.name,
                    info: editService.info,
                    nickname: editService.nickname,
                },
            });
            setEditService(null);
            fetchServices();
        } catch (err) {
            console.error("Ошибка редактирования чата:", err);
            setError("Не удалось обновить чат.");
        }
    };

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

    const handleImageUpload = async (id: number) => {
        if (!selectedFile) {
            setError("Выберите файл для загрузки.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            await api.chatsIdNewImagePost({ id, image: selectedFile });
            setSelectedFile(null);
            fetchServices();
        } catch (err) {
            console.error("Ошибка загрузки аватарки:", err);
            setError("Не удалось загрузить аватарку.");
        }
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
                                <input
                                    type="file"
                                    className="service-button"
                                    accept="image/*"
                                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                />
                                <button
                                    className="service-button"
                                    onClick={() => handleImageUpload(service.id!)}
                                >
                                    Загрузить
                                </button>
                            </td>
                            <td>
                                {editService && editService.id === service.id ? (
                                    <input
                                        type="text"
                                        value={editService.name}
                                        onChange={(e) => setEditService({...editService, name: e.target.value})}/>
                                ) : (
                                    service.name
                                )}
                            </td>
                            <td>
                                {editService && editService.id === service.id ? (
                                    <input
                                        type="text"
                                        value={editService.info || ""}
                                        onChange={(e) => setEditService({...editService, info: e.target.value})}/>
                                ) : (
                                    service.info
                                )}
                            </td>
                            <td>
                                {editService && editService.id === service.id ? (
                                    <input
                                        type="text"
                                        value={editService.nickname || ""}
                                        onChange={(e) => setEditService({...editService, nickname: e.target.value})}/>
                                ) : (
                                    service.nickname
                                )}
                            </td>
                            <td>
                                {editService && editService.id === service.id ? (
                                    <>
                                        <button className="service-button" onClick={handleEditService}>Сохранить
                                        </button>
                                        <button className="service-button" onClick={() => setEditService(null)}>Отмена
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="service-button"
                                                onClick={() => setEditService(service)}>Редактировать
                                        </button>
                                        <button className="service-button"
                                                onClick={() => handleDeleteService(service.id!)}>Удалить
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="add-service-form">
                    <h2>Добавить чат</h2>
                    <input
                        type="text"
                        placeholder="Имя"
                        value={newService.name}
                        onChange={(e) => setNewService({...newService, name: e.target.value})}/>
                    <textarea
                        placeholder="Описание (необязательно)"
                        value={newService.info || ""}
                        onChange={(e) => setNewService({...newService, info: e.target.value})}/>
                    <input
                        type="text"
                        placeholder="Псевдоним"
                        value={newService.nickname || ""}
                        onChange={(e) => setNewService({...newService, nickname: e.target.value})}/>
                    <button onClick={handleAddService}>Добавить</button>
                </div>
            </div>
        </>
    );

    // return (
    //     <><Header></Header>
    //         <div className="services-page">
    //             <h1>Управление чатами</h1>
    //             {error && <div className="error">{error}</div>}
    //
    //             <table className="services-table">
    //                 <thead>
    //                 <tr>
    //                     <th>ID</th>
    //                     <th>Имя</th>
    //                     <th>Описание</th>
    //                     <th>Псевдоним</th>
    //                     <th>Действия</th>
    //                 </tr>
    //                 </thead>
    //                 <tbody>
    //                 {services.map((service) => (
    //                     <tr key={service.id}>
    //                         <td>{service.id}</td>
    //                         <td>
    //                             {editService && editService.id === service.id ? (
    //                                 <input
    //                                     type="text"
    //                                     value={editService.name}
    //                                     onChange={(e) => setEditService({...editService, name: e.target.value})}/>
    //                             ) : (
    //                                 service.name
    //                             )}
    //                         </td>
    //                         <td>
    //                             {editService && editService.id === service.id ? (
    //                                 <input
    //                                     type="text"
    //                                     value={editService.info || ""}
    //                                     onChange={(e) => setEditService({...editService, info: e.target.value})}/>
    //                             ) : (
    //                                 service.info
    //                             )}
    //                         </td>
    //                         <td>
    //                             {editService && editService.id === service.id ? (
    //                                 <input
    //                                     type="text"
    //                                     value={editService.nickname || ""}
    //                                     onChange={(e) => setEditService({...editService, nickname: e.target.value})}/>
    //                             ) : (
    //                                 service.nickname
    //                             )}
    //                         </td>
    //                         <td>
    //                             {editService && editService.id === service.id ? (
    //                                 <>
    //                                     <button className="service-button" onClick={handleEditService}>Сохранить</button>
    //                                     <button className="service-button" onClick={() => setEditService(null)}>Отмена</button>
    //                                 </>
    //                             ) : (
    //                                 <>
    //                                     <button className="service-button" onClick={() => setEditService(service)}>Редактировать</button>
    //                                     <button className="service-button" onClick={() => handleDeleteService(service.id!)}>Удалить</button>
    //                                 </>
    //                             )}
    //                         </td>
    //                     </tr>
    //                 ))}
    //                 </tbody>
    //             </table>
    //
    //             <div className="add-service-form">
    //                 <h2>Добавить чат</h2>
    //                 <input
    //                     type="text"
    //                     placeholder="Имя"
    //                     value={newService.name}
    //                     onChange={(e) => setNewService({...newService, name: e.target.value})}/>
    //                 <textarea
    //                     placeholder="Описание (необязательно)"
    //                     value={newService.info || ""}
    //                     onChange={(e) => setNewService({...newService, info: e.target.value})}/>
    //                 <input
    //                     type="text"
    //                     placeholder="Псевдоним"
    //                     value={newService.nickname || ""}
    //                     onChange={(e) => setNewService({...newService, nickname: e.target.value})}/>
    //                 <button onClick={handleAddService}>Добавить</button>
    //             </div>
    //         </div>
    //     </>
    // );
};

export default ServicesPage;