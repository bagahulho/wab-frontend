import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
// import ITunesPage from "./pages/ITunesPage/ITunesPage.tsx";
import App from "./App.tsx";
import Header from "./components/Header/Header.tsx";
import {Provider} from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Header></Header>
    <App />
    </Provider>,
)