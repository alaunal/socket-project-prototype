import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./hooks/useAuth";
import { SocketProvider } from "./hooks/useSocket";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </AuthProvider>,
);
