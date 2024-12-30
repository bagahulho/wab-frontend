import React, {useEffect} from 'react';
import "./Header.css"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {logout, restoreSession} from "../../store/slices/authSlice.ts";
const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, token, username, isModerator } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (username && token) {
                dispatch(
                    restoreSession({
                        token: token,
                        username: username,
                        isModerator: isModerator,
                    }
                )
            );
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); // Возвращаем на главную после выхода
    };

    return (
        <header className="site-header">
            <Link to="/" className="home-link">
                <svg width="45px" height="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.73824 5.89023C4.4012 5.64944 3.93278 5.72746 3.69199 6.0645C3.4512 6.40153 3.52922 6.86995 3.86625 7.11074L4.73824 5.89023ZM10.0825 10.6301L9.64647 11.2404L10.0825 10.6301ZM13.9175 10.6301L13.4815 10.0199L13.9175 10.6301ZM20.1337 7.11074C20.4708 6.86995 20.5488 6.40153 20.308 6.0645C20.0672 5.72746 19.5988 5.64944 19.2617 5.89023L20.1337 7.11074ZM3.86625 7.11074L9.64647 11.2404L10.5185 10.0199L4.73824 5.89023L3.86625 7.11074ZM14.3535 11.2404L20.1337 7.11074L19.2617 5.89023L13.4815 10.0199L14.3535 11.2404ZM9.64647 11.2404C11.0543 12.2462 12.9456 12.2462 14.3535 11.2404L13.4815 10.0199C12.5953 10.6531 11.4047 10.6531 10.5185 10.0199L9.64647 11.2404Z"
                        fill="#0095FF"/>
                    <path
                        d="M2.88539 15.1513L3.61329 14.9705L2.88539 15.1513ZM2.88539 8.84875L3.61329 9.02949L2.88539 8.84875ZM21.1146 8.84876L21.8425 8.66801L21.1146 8.84876ZM21.1146 15.1512L21.8425 15.332L21.1146 15.1512ZM15.1156 20.659L14.9533 19.9267H14.9533L15.1156 20.659ZM8.88443 20.659L8.72217 21.3912H8.72218L8.88443 20.659ZM8.88443 3.34105L8.72218 2.60881V2.60881L8.88443 3.34105ZM15.1156 3.34105L14.9533 4.07329L15.1156 3.34105ZM8.43055 20.5584L8.59281 19.8261H8.59281L8.43055 20.5584ZM15.5694 20.5584L15.7317 21.2906H15.7317L15.5694 20.5584ZM15.5694 3.44162L15.7317 2.70938V2.70938L15.5694 3.44162ZM8.43056 3.44162L8.59281 4.17386L8.43056 3.44162ZM8.59281 4.17386L9.04668 4.07329L8.72218 2.60881L8.2683 2.70938L8.59281 4.17386ZM14.9533 4.07329L15.4072 4.17386L15.7317 2.70938L15.2778 2.60881L14.9533 4.07329ZM15.4072 19.8261L14.9533 19.9267L15.2778 21.3912L15.7317 21.2906L15.4072 19.8261ZM9.04668 19.9267L8.59281 19.8261L8.2683 21.2906L8.72217 21.3912L9.04668 19.9267ZM3.61329 14.9705C3.1289 13.0198 3.1289 10.9802 3.61329 9.02949L2.1575 8.668C1.61417 10.8561 1.61417 13.1439 2.1575 15.332L3.61329 14.9705ZM20.3867 9.0295C20.8711 10.9802 20.8711 13.0198 20.3867 14.9705L21.8425 15.332C22.3858 13.1439 22.3858 10.8561 21.8425 8.66801L20.3867 9.0295ZM14.9533 19.9267C13.008 20.3578 10.992 20.3578 9.04668 19.9267L8.72218 21.3912C10.8812 21.8696 13.1188 21.8696 15.2778 21.3912L14.9533 19.9267ZM9.04668 4.07329C10.992 3.64224 13.008 3.64224 14.9533 4.07329L15.2778 2.60881C13.1188 2.1304 10.8812 2.1304 8.72218 2.60881L9.04668 4.07329ZM8.59281 19.8261C6.14627 19.284 4.21736 17.4032 3.61329 14.9705L2.1575 15.332C2.89874 18.3171 5.26576 20.6253 8.2683 21.2906L8.59281 19.8261ZM15.7317 21.2906C18.7342 20.6253 21.1013 18.3171 21.8425 15.332L20.3867 14.9705C19.7826 17.4032 17.8537 19.284 15.4072 19.8261L15.7317 21.2906ZM15.4072 4.17386C17.8537 4.71598 19.7826 6.5968 20.3867 9.0295L21.8425 8.66801C21.1013 5.68288 18.7342 3.3747 15.7317 2.70938L15.4072 4.17386ZM8.2683 2.70938C5.26576 3.3747 2.89874 5.68288 2.1575 8.668L3.61329 9.02949C4.21736 6.59679 6.14627 4.71598 8.59281 4.17386L8.2683 2.70938Z"
                        fill="#0095FF"/>
                    <path
                        d="M2.88539 15.1513L3.61329 14.9705L2.88539 15.1513ZM2.88539 8.84875L3.61329 9.02949L2.88539 8.84875ZM21.1146 8.84876L21.8425 8.66801L21.1146 8.84876ZM20.3867 14.9705C20.2869 15.3725 20.5319 15.7793 20.9339 15.8791C21.3359 15.979 21.7427 15.734 21.8425 15.332L20.3867 14.9705ZM15.1156 20.659L14.9533 19.9267H14.9533L15.1156 20.659ZM8.88443 20.659L8.72217 21.3912H8.72218L8.88443 20.659ZM8.88443 3.34105L8.72218 2.60881V2.60881L8.88443 3.34105ZM15.1156 3.34105L14.9533 4.07329L15.1156 3.34105ZM8.43055 20.5584L8.59281 19.8261H8.59281L8.43055 20.5584ZM15.7317 21.2906C16.1361 21.201 16.3913 20.8005 16.3017 20.3961C16.2121 19.9917 15.8116 19.7365 15.4072 19.8261L15.7317 21.2906ZM15.5694 3.44162L15.7317 2.70938V2.70938L15.5694 3.44162ZM8.43056 3.44162L8.59281 4.17386L8.43056 3.44162ZM8.59281 4.17386L9.04668 4.07329L8.72218 2.60881L8.2683 2.70938L8.59281 4.17386ZM14.9533 4.07329L15.4072 4.17386L15.7317 2.70938L15.2778 2.60881L14.9533 4.07329ZM15.4072 19.8261L14.9533 19.9267L15.2778 21.3912L15.7317 21.2906L15.4072 19.8261ZM9.04668 19.9267L8.59281 19.8261L8.2683 21.2906L8.72217 21.3912L9.04668 19.9267ZM3.61329 14.9705C3.1289 13.0198 3.1289 10.9802 3.61329 9.02949L2.1575 8.668C1.61417 10.8561 1.61417 13.1439 2.1575 15.332L3.61329 14.9705ZM20.3867 9.0295C20.8711 10.9802 20.8711 13.0198 20.3867 14.9705L21.8425 15.332C22.3858 13.1439 22.3858 10.8561 21.8425 8.66801L20.3867 9.0295ZM14.9533 19.9267C13.008 20.3578 10.992 20.3578 9.04668 19.9267L8.72218 21.3912C10.8812 21.8696 13.1188 21.8696 15.2778 21.3912L14.9533 19.9267ZM9.04668 4.07329C10.992 3.64224 13.008 3.64224 14.9533 4.07329L15.2778 2.60881C13.1188 2.1304 10.8812 2.1304 8.72218 2.60881L9.04668 4.07329ZM8.59281 19.8261C6.14627 19.284 4.21736 17.4032 3.61329 14.9705L2.1575 15.332C2.89874 18.3171 5.26576 20.6253 8.2683 21.2906L8.59281 19.8261ZM15.4072 4.17386C17.8537 4.71598 19.7826 6.5968 20.3867 9.0295L21.8425 8.66801C21.1013 5.68288 18.7342 3.3747 15.7317 2.70938L15.4072 4.17386ZM8.2683 2.70938C5.26576 3.3747 2.89874 5.68288 2.1575 8.668L3.61329 9.02949C4.21736 6.59679 6.14627 4.71598 8.59281 4.17386L8.2683 2.70938Z"
                        fill="#363853"/>
                </svg>
                <span className="logo-text">WK</span>
            </Link>
            <nav className='nav'>
                <div className='nav__wrapper'>
                    <div className='nav__links'>
                        {isAuthenticated ? (
                            <>
                                {isModerator ?(
                                    <><Link to='/recipient-chats' className='nav__link'>Таблица чатов</Link><Link to='/chats'
                                                                                                         className='nav__link'>Чаты</Link></>
                                ): (
                                    <Link to='/chats' className='nav__link'>Чаты</Link>
                                )}
                                <Link to='/messages' className='nav__link'>Сообщения</Link>
                                <Link to='/user/profile' className='nav__link'>{username}</Link>
                                <button className="nav__link" onClick={handleLogout}>
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to='/user/register' className='nav__link'>Регистрация</Link>
                                <Link to='/user/login' className='nav__link'>Вход</Link>
                            </>
                        )}
                    </div>
                    <div className='nav__mobile-wrapper'
                         onClick={(event) => event.currentTarget.classList.toggle('active')}
                    >
                        <div className='nav__mobile-target'/>
                        <div className='nav__mobile-menu'>
                            {isAuthenticated ? (
                                <>
                                    {isModerator ?(
                                        <><Link to='/recipient-chats' className='nav__link'>Таблица чатов</Link><Link to='/chats'
                                                                                                             className='nav__link'>Чаты</Link></>
                                    ): (
                                        <Link to='/chats' className='nav__link'>Чаты</Link>
                                    )}
                                    <Link to='/messages' className='nav__link'>Сообщения</Link>
                                    <Link to='/user/profile' className='nav__link'>{username}</Link>
                                    <button className="nav__link" onClick={handleLogout}>
                                        Выйти
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to='/user/register' className='nav__link'>Регистрация</Link>
                                    <Link to='/user/login' className='nav__link'>Вход</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;


// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { RootState } from '../../store';
// import { logout } from '../../store/slices/authSlice';
//
// const Header: React.FC = () => {
//
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//                 <Link className="navbar-brand" to="/">Главная</Link>
//                 <div className="collapse navbar-collapse">
//                     <ul className="navbar-nav me-auto">
//                         {isAuthenticated ? (
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/chats">Мои заявки</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/user/profile">Личный кабинет</Link>
//                                 </li>
//                             </>
//                         ) : (
//                             <>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/user/register">Регистрация</Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link className="nav-link" to="/user/login">Вход</Link>
//                                 </li>
//                             </>
//                         )}
//                     </ul>
//                     {isAuthenticated && (
//                         <button className="btn btn-outline-danger" onClick={handleLogout}>
//                             Выйти
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };
//
// export default Header;