import './App.css';
import React from 'react';
import Login from './components/Login';
import Home from './container/Home';
import {Routes, Route, useNavigate} from 'react-router-dom'




function App() {
  return (
      <Routes>
          <Route path="login" element={<Login/>} />
          <Route path="/*" element={<Home/>} />
      </Routes>
  );
}

export default App;
