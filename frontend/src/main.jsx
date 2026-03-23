import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

// Google Auth
import { GoogleOAuthProvider } from "@react-oauth/google";

// UI
import { Toaster } from "./components/ui/sonner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);