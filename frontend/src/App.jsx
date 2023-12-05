import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Inicio from './components/Inicio';
import GestionarAsignaturas from './components/gestionarasignaturas';
import InscripcionCursos from './components/InscripcionCursos';
import MallaEstudiante from './components/MallaEstudiante';

function App() {
  const [count, setCount] = useState(0);

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
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
