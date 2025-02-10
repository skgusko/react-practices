import ReactDOM from 'react-dom/client'; //node_modules에 설치되어 있는 거
import {App} from './app.js';

// document
//     .getElementById("root")
//     .appendChild(App());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(App()); //VirtualDOM을 RealDOM에 마운트