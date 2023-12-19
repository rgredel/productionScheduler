import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { useLocalState } from './util/useLocalStorage';
import ProductionProcesses from './components/ProductionProcess';
import ProductionProcessDetail from './components/ProductionProcess/ProductionProcessDetail.js';

import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Reservation from './components/Reservation/Reservation';
import Logout from './components/Login/Logout';
import GanttChar from './components/GanttChar';

function App() {  

  return (
    <Routes>
      <Route path="/" element={<ProductionProcesses />}></Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/logout" element={<Logout />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/schedule/:id" element={<GanttChar />}/>
      <Route path="/productionProcess/:id" element={<ProductionProcessDetail />}/>

      <Route path="/reservation" element={
        <PrivateRoute>
         <Reservation />
        </PrivateRoute>}/>
    </Routes>
    
  );
}

export default App;
