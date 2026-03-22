import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Redux & Redux Persist
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// Google OAuth  ← ADDED
import { GoogleOAuthProvider } from '@react-oauth/google';

// UI Notifications
import { Toaster } from './components/ui/sonner.jsx';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
