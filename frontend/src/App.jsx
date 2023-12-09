import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Inicio from './components/Inicio';
import GestionarAsignaturas from './components/GestionarAsignaturas';
import GestionarEstudiantes from './components/GestionarEstudiantes';
import AdminsitrarHorario from './components/AdministrarHorario';
import HorarioAsignatura from './components/HorarioAsignaturas';

function App() {

  return (
    <BrowserRouter>
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/GestionarAsignaturas" element={<GestionarAsignaturas />} />
            <Route path="/GestionarEstudiantes" element={<GestionarEstudiantes />} />
            <Route path="/AdministrarHorario/:id" element={<AdminsitrarHorario />} />
            <Route path="/HorarioAsignatura/:id" element={<HorarioAsignatura />} />
            
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
