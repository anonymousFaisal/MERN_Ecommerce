import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/css/animate.min.css";
import "./assets/css/main.css";
import "react-loading-skeleton/dist/skeleton.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
