import { BrowserRouter, Route, Routes } from "react-router-dom";
// import {HomePage} from "./pages/HomePage/HomePage";
import MainPage from "./pages/MainPage/MainPage"
import ChatsPage from "./pages/ChatsPage/ChatsPage"
import ChatPage from "./pages/ChatPage/ChatPage";
import { ROUTES } from "./Routes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} index element={<MainPage />} />
                <Route path={ROUTES.CHATS} element={<ChatsPage />} />
                <Route path={`${ROUTES.CHATS}/:id`} element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


// import React from 'react';
// import ChatsPage from './pages/ChatsPage/ChatsPage';
//
// const App: React.FC = () => {
//     return (
//         <div>
//             <ChatsPage />
//         </div>
//     );
// };
//
// export default App;