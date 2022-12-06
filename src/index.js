import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Customerlist from './components/Customerlist'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation'
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Customerlist />} />
          <Route path="Traininglist" element={<Traininglist />} />
          <Route path="Calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();