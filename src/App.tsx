import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage"
import ChatsPage from "./pages/ChatsPage/ChatsPage"
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
    return (
        <BrowserRouter basename="/wab-frontend">
            <Routes>
                <Route path="/" index element={<MainPage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/chats/:id" element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;