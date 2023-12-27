import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { useLocalState } from './util/useLocalStorage';
import ProductionProcesses from './components/ProductionProcess';
import ProductionProcessDetail from './components/ProductionProcess/ProductionProcessDetail.js';
import HomePage from './components/HomePage';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Logout from './components/Login/Logout';
import GanttChar from './components/GanttChar';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>


      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />

      <Route path="/schedule/:id" element={
        <PrivateRoute>
          <GanttChar />
        </PrivateRoute>} />

      <Route path="/productionProcess" element={
        <PrivateRoute>
          <ProductionProcesses />
        </PrivateRoute>} />

      <Route path="/productionProcess/:id" element={
        <PrivateRoute>
          <ProductionProcessDetail />
        </PrivateRoute>} />

    </Routes>
  );
}

export default App;
