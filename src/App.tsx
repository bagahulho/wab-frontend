import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage"
import ChatsPage from "./pages/ChatsPage/ChatsPage"
import ChatPage from "./pages/ChatPage/ChatPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from './pages/LoginPage/LoginPage';
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import MessagePage from "./pages/MessagePage/MessagePage.tsx";
import Page404 from "./pages/Page404/Page404.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import ServicesPage from "./pages/ServicesPage/ServicesPage.tsx";
import Page403 from "./pages/Page403/Page403.tsx";
import ChatEditPage from "./pages/ChatEditPage/ChatEditPage.tsx";

function App() {
    const { isModerator, isAuthenticated} = useSelector((state: RootState) => state.auth);

    return (
        <BrowserRouter basename="/wab-frontend">
            <Routes>
                <Route path="/" index element={<MainPage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/chats/:id" element={<ChatPage />} />
                <Route
                    path="/user/register"
                    element={!isAuthenticated ? <RegisterPage /> : <Page403 />}
                />
                <Route
                    path="/user/login"
                    element={!isAuthenticated ? <LoginPage /> : <Page403 />}
                />
                <Route
                    path="/user/profile"
                    element={isAuthenticated ? <ProfilePage /> : <Page403 />}
                />
                <Route
                    path="/messages"
                    element={isModerator || isAuthenticated ? <MessagesPage /> : <Page403 />}
                />
                <Route
                    path="/messages/:id"
                    element={isModerator || isAuthenticated ? <MessagePage /> : <Page403 />}
                />
                <Route
                    path="/recipient-chats"
                        element={isModerator ? <ServicesPage /> : <Page403 />}
                />
                <Route
                    path="/chats/edit/:id?"
                    element={isModerator ? <ChatEditPage /> : <Page403 />}
                />
                <Route
                    path="/chats/add"
                    element={isModerator ? <ChatEditPage /> : <Page403 />}
                />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;