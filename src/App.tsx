import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage"
import ChatsPage from "./pages/ChatsPage/ChatsPage"
import ChatPage from "./pages/ChatPage/ChatPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from './pages/LoginPage/LoginPage';
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import MessagePage from "./pages/MessagePage/MessagePage.tsx";

function App() {
    return (
        <BrowserRouter basename="/wab-frontend">
            <Routes>
                <Route path="/" index element={<MainPage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/chats/:id" element={<ChatPage />} />
                <Route path="/user/register" element={<RegisterPage />} />
                <Route path="/user/login" element={<LoginPage />} />
                <Route path="/user/profile" element={<ProfilePage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/messages/:id" element={<MessagePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;