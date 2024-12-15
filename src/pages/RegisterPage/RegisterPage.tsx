import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./RegisterPage.css";
import Header from "../../components/Header/Header.tsx";

const RegisterPage: React.FC = () => {
    return (
        <><Header></Header>
            <div className="register-page">
                <div className="container">
                    <RegisterForm/>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
