import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from "./App.tsx";
import Header from "./components/Header/Header.tsx";
import {Provider} from "react-redux";
import store from "./store";
import {StrictMode} from "react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <Header></Header>
            <App />
        </Provider>
    </StrictMode>,
)