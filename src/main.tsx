import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from "./App.tsx";
import {Provider} from "react-redux";
import store from "./store";
import {StrictMode} from "react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(() => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}