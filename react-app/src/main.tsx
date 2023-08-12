import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { RootContextProvider } from "./store/RootContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootContextProvider>
      <App />
    </RootContextProvider>
  </React.StrictMode>,
);
