import React from 'react';
import "./MainPage.css"
import Header from "../../components/Header/Header";
import CarouselComponent from "../../components/Carousel/Carousel.tsx";

const MainPage: React.FC = () => {
    return (
        <><Header></Header>
            <div>
                <main className="main-container mt-4">
                    <h1>Добро пожаловать в систему рассылок</h1>
                    <p>Данный сервис предназначен для отправки общего сообщения нескольким чатам, вместо того, чтобы отправлять каждому по отдельности</p>
                </main>
                <CarouselComponent />
            </div>
        </>
    );
};

export default MainPage;