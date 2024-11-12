import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
// import ITunesPage from "./pages/ITunesPage/ITunesPage.tsx";
import App from "./App.tsx";
import Header from "./components/Header/Header.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Header></Header>
    <App />
    </React.StrictMode>,
)