import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter as Router} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "@services/serviceWorker";
import React from "react";

import App from "./App";

import "./index.scss";

const root = ReactDOM.createRoot(document.querySelector('.wrapper'));

const queryClient = new QueryClient();


root.render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Router>
);
