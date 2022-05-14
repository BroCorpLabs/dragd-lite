import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DragDrop from './DragDrop';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DragDrop />
  </React.StrictMode>
);