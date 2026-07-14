import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserAuthProvider } from "./context/UserAuthContext";
import { TrainerAuthprovider } from "./context/TrainerAuthContext";
import App from "./App";
import './index.css'
ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserAuthProvider>
        <TrainerAuthprovider>
          <App />
        </TrainerAuthprovider>
      </UserAuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);