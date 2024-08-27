import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/_general.css'
import 'remixicon/fonts/remixicon.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1 className='app-name'>To-Do-List</h1>
    <App />
  </React.StrictMode>
);

