import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Backdrop,
  CircularProgress,
  Typography,
} from '@mui/material';
import OpcionesAsignaturas from './OpcionesAsignaturas';
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
        
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    fetchData();
  }, []);

  const handleAsignaturaClick = (asignatura) => {
    setError(null);
    setSelectedAsignatura(asignatura);
  };

  if (selectedAsignatura) {
    return <OpcionesAsignaturas asignatura={selectedAsignatura} />;
  }

  return (
    <div>
      <br />
      <Typography variant="h4">Gestionar Asignaturas</Typography>
      <hr />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {error && (
          <div style={{ textAlign: 'center' }}>
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          </div>
        )}

        {loadedSuccessfully && !error && (
          <div style={{ textAlign: 'center' }}>
            <Alert variant="filled" severity="success">
              Se ha cargado correctamente las asignaturas
            </Alert>
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
    </div>
  );
};

export default GestionarAsignaturas;
