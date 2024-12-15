import React from 'react';
import "./MainPage.css"
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const MainPage: React.FC = () => {
    const { isModerator } = useSelector((state: RootState) => state.auth);
    return (
        <><Header></Header>
            <div>
                <main className="main-container mt-4">
                    <h1>Добро пожаловать в систему рассылок</h1>
                    <p>Данный сервис предназначен для отправки общего сообщения нескольким чатам, вместо того, чтобы отправлять каждому по отдельности</p>
                    {isModerator ? (
                        <Link to="/recipient-chats">
                            <Button variant="outline-primary" size="lg">
                                Список чатов
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/chats">
                            <Button variant="outline-primary" size="lg">
                                Список чатов
                            </Button>
                        </Link>
                        )
                    }
                </main>
            </div>
        </>
    );
};

export default MainPage;
