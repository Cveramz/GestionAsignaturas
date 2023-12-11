import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, AlertTitle } from '@mui/material';

const VerNotas = ({ rut }) => {
  const [notas, setNotas] = useState([]);
  const [promedios, setPromedios] = useState([]);
  const [tamanoTabla, setTamanoTabla] = useState(0);

  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const notasResponse = await axios.get(`http://localhost:8080/notas/estudiante/${rut}`);
        setNotas(notasResponse.data);

        const notasPorAsignatura = agruparNotasPorAsignatura(notasResponse.data);
        const promediosPorAsignatura = await obtenerPromediosPorAsignatura(notasPorAsignatura);
        const promediosFiltrados = filtrarPromedios(promediosPorAsignatura);

        setPromedios(promediosFiltrados);

        // Determinar el tamaño de la tabla en función del máximo de notas por asignatura
        const cantidadMaxima = Math.max(...promediosFiltrados.map(asignatura => asignatura.notas.length));
        setTamanoTabla(cantidadMaxima + 2);

        // Mostrar la alerta si no hay notas
        setMostrarAlerta(promediosFiltrados.length === 0);
      } catch (error) {
        console.error('Error al obtener las notas:', error);
      }
    };

    fetchNotas();
  }, [rut]);

  const agruparNotasPorAsignatura = (notas) => {
    const notasPorAsignatura = {};
    notas.forEach(nota => {
      if (!notasPorAsignatura[nota.codAsignatura]) {
        notasPorAsignatura[nota.codAsignatura] = [];
      }
      notasPorAsignatura[nota.codAsignatura].push(nota);
    });
    return notasPorAsignatura;
  };

  const obtenerPromediosPorAsignatura = async (notasPorAsignatura) => {
    const uniqueAsignaturas = Object.keys(notasPorAsignatura);
    const promediosPorAsignatura = await Promise.all(uniqueAsignaturas.map(async (codAsignatura) => {
      const notasAsignatura = notasPorAsignatura[codAsignatura];
      const promedio = calcularPromedio(notasAsignatura);
      const inscripcion = await verificarInscripcion(codAsignatura);
      const asignaturaInfo = await obtenerInfoAsignatura(codAsignatura);

      return { codAsignatura, promedio, notas: notasAsignatura, inscripcion, asignaturaInfo };
    }));

    return promediosPorAsignatura;
  };

  const calcularPromedio = (notasAsignatura) => {
    if (notasAsignatura.length === 0) {
      return 0;
    }

    const sumatoriaNotas = notasAsignatura.reduce((sum, nota) => sum + nota.nota, 0);
    return sumatoriaNotas / notasAsignatura.length;
  };

  const verificarInscripcion = async (codAsignatura) => {
    try {
      const inscripcionesResponse = await axios.get(`http://localhost:8080/inscripciones/rut/${rut}`);
      const inscripcion = inscripcionesResponse.data.find(insc => insc.codAsignatura === codAsignatura && (insc.estado === 'aprobado' || insc.estado === 'cursando'));

      return !!inscripcion; // Devuelve true si se encuentra la inscripción, false si no
    } catch (error) {
      console.error(`Error al verificar inscripción de asignatura ${codAsignatura}:`, error);
      return false;
    }
  };

  const obtenerInfoAsignatura = async (codAsignatura) => {
    try {
      const response = await axios.get(`http://localhost:8080/asignaturas/${codAsignatura}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener información de asignatura ${codAsignatura}:`, error);
      return null;
    }
  };

  const filtrarPromedios = (promedios) => {
    return promedios.filter(asignatura => asignatura.inscripcion);
  };

  return (
    <>
      {mostrarAlerta && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>¡Advertencia!</AlertTitle>
          No se encontraron notas, esto puede ser debido a que no estás inscrito en ninguna asignatura
          <br />
          o porque aún no se han ingresado notas para las asignaturas en las que está inscrito.
        </Alert>
      )}
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asignatura</TableCell>
              <TableCell>Promedio</TableCell>
              {Array.from({ length: tamanoTabla - 2 }).map((_, index) => (
                <TableCell key={index + 1}>{`Nota ${index + 1}`}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {promedios.map((asignatura, index) => (
              <TableRow key={index}>
                <TableCell>{asignatura.asignaturaInfo ? asignatura.asignaturaInfo.nomAsig : asignatura.codAsignatura}</TableCell>
                <TableCell>{asignatura.promedio.toFixed(2)}</TableCell>
                {Array.from({ length: tamanoTabla - 2 }, (_, notaIndex) => {
                  const nota = asignatura.notas[notaIndex];
                  return <TableCell key={notaIndex}>{nota ? nota.nota.toFixed(2) : ''}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VerNotas;
