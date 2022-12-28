import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";

import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

window.store = store;
Kommunicate.init("3acddaa0c0f1e7dc4e165942616fd10bd");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
