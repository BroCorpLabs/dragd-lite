import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DragDrop from './DragDrop';
import './App.css';

// Mock frontend to test the build process

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DragDrop />
  </React.StrictMode>
);