import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';
import Header from "../../components/Header/Header.tsx";

const LoginPage: React.FC = () => {
    return (
        <><Header></Header>
            <div className="login-page">
                <div className="login-container">
                    <LoginForm/>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
