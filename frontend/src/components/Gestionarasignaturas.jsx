import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import OpcionesAsignaturas from './OpcionesAsignaturas'; // Importa el componente OpcionesAsignaturas
import axios from 'axios';

const GestionarAsignaturas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedSuccessfully, setLoadedSuccessfully] = useState(false);
  const [selectedAsignatura, setSelectedAsignatura] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/asignaturas');
        setAsignaturas(response.data);
        setLoadedSuccessfully(true);
      } catch (error) {
        console.error('Error al obtener asignaturas', error);
        setError('Error al obtener asignaturas. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAsignaturaClick = (asignatura) => {
    setError(null); // Establecer error en null para ocultar el Alert
    setSelectedAsignatura(asignatura);
  };

  // Renderizado condicional para mostrar el componente adecuado
  if (selectedAsignatura) {
    return <OpcionesAsignaturas asignatura={selectedAsignatura} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      {loading && !error && <LinearProgress style={{ width: '50%' }} />}
      {loadedSuccessfully && (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          {error ? (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          ) : (
            <Alert variant="filled" severity="success">
              Se ha cargado correctamente las asignaturas
            </Alert>
          )}
        </div>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cod_Asig</TableCell>
              <TableCell>Cod_Plan</TableCell>
              <TableCell>Nivel</TableCell>
              <TableCell>Nom_Asig</TableCell>
              <TableCell>Limite Estudiantes</TableCell>
              <TableCell>Cod_Carr</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {asignaturas.map((asignatura) => (
              <TableRow
                key={asignatura.codAsig}
                onClick={() => handleAsignaturaClick(asignatura)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{asignatura.codAsig}</TableCell>
                <TableCell>{asignatura.codPlan}</TableCell>
                <TableCell>{asignatura.nivel}</TableCell>
                <TableCell>{asignatura.nomAsig}</TableCell>
                <TableCell>{asignatura.limiteEstudiantes}</TableCell>
                <TableCell>{asignatura.codCarr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GestionarAsignaturas;
