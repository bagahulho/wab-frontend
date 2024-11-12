import React from 'react';
import "./MainPage.css"
import {Button} from "react-bootstrap";

const MainPage: React.FC = () => {
    return (
        <>
            <div>
                <main className="main-container mt-4">
                    <h1>Добро пожаловать в систему рассылок</h1>
                    <p>Данный сервис предназначен для отправки общего сообщения нескольким чатам, вместо того, чтобы отправлять каждому по отдельности</p>
                    <Button variant="outline-primary" size="lg" href="/chats">Список чатов</Button>{''}
                </main>
            </div>
        </>
    );
};

export default MainPage;
