// RutCarreraComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const Malla = ({ rut, codigoCarrera }) => {
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/asignaturas/carrera/${codigoCarrera}`
        );
        setAsignaturas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [codigoCarrera]);

  const maxNivel = asignaturas.reduce((max, asignatura) => Math.max(max, asignatura.nivel), 0);

  // Crear una matriz para almacenar las asignaturas por nivel
  const matrizAsignaturas = Array.from({ length: maxNivel }, () => []);

  // Llenar la matriz con las asignaturas correspondientes
  asignaturas.forEach((asignatura) => {
    matrizAsignaturas[asignatura.nivel - 1].push(asignatura);
  });

  return (
    <div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Array.from({ length: maxNivel }, (_, index) => (
                <TableCell key={index} sx={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  {`Nivel ${index + 1}`}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Recorrer las filas */}
            {Array.from({ length: Math.max(...matrizAsignaturas.map((nivel) => nivel.length)) }, (_, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* Recorrer las columnas */}
                {matrizAsignaturas.map((nivel, columnIndex) => (
                  <TableCell key={columnIndex} sx={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    {nivel[rowIndex] ? nivel[rowIndex].nomAsig : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Malla;
