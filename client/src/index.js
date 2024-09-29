import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Импортируем PersistGate
import store, { persistor } from './store/store'; // Импорт store и persistor
import App from './App';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
            <App />
        </PersistGate>
    </Provider>
);
