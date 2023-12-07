import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Inicio from './components/Inicio';
import GestionarAsignaturas from './components/gestionarasignaturas';
import InscripcionCursos from './components/InscripcionCursos';
import MallaEstudiante from './components/MallaEstudiante';
import AdminsitrarHorario from './components/AdministrarHorario';
import HorarioAsignatura from './components/HorarioAsignatura';

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
            <Route path="/InscripcionCursos" element={<InscripcionCursos />} />
            <Route path="/MallaEstudiante" element={<MallaEstudiante />} />
            <Route path="/AdministrarHorario/:id" element={<AdminsitrarHorario />} />
            <Route path="/HorarioAsignatura/:id" element={<HorarioAsignatura />} />
            
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
