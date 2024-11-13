import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage"
import ChatsPage from "./pages/ChatsPage/ChatsPage"
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
    return (
        <BrowserRouter basename="/wab-frontend">
            <Routes>
                <Route path="/wab-frontend/" index element={<MainPage />} />
                <Route path="/wab-frontend/chats" element={<ChatsPage />} />
                <Route path="/wab-frontendchats/:id" element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;