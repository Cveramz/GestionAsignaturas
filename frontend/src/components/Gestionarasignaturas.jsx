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
  Autocomplete,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpcionesAsignaturas from './OpcionesAsignaturas';
import axios from 'axios';

const GestionarAsignaturas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedSuccessfully, setLoadedSuccessfully] = useState(false);
  const [selectedAsignatura, setSelectedAsignatura] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredAsignaturas, setFilteredAsignaturas] = useState([]);
  const [alumnosInscritos, setAlumnosInscritos] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAsignaturas = await axios.get('http://localhost:8080/asignaturas');
        const asignaturasData = responseAsignaturas.data;

        const inscritosPromises = asignaturasData.map(async (asignatura) => {
          const responseInscritos = await axios.get(`http://localhost:8080/inscripciones/count/${asignatura.codAsig}`);
          return { codAsig: asignatura.codAsig, inscritos: responseInscritos.data };
        });

        const inscritosData = await Promise.all(inscritosPromises);
        const inscritosMap = inscritosData.reduce((acc, curr) => {
          acc[curr.codAsig] = curr.inscritos;
          return acc;
        }, {});

        setAlumnosInscritos(inscritosMap);
        setAsignaturas(asignaturasData);
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

  useEffect(() => {
    const filtered = asignaturas.filter(
      asignatura =>
        asignatura.codAsig.toString().includes(searchValue) ||
        asignatura.nomAsig.includes(searchValue)
    );
    setFilteredAsignaturas(filtered);
  }, [searchValue, asignaturas]);

  const handleAsignaturaClick = (asignatura) => {
    setError(null);
    setSelectedAsignatura(asignatura);
  };

  const handleCloseAlert = () => {
    setError(null);
    setLoadedSuccessfully(false);
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
            <Alert
              variant="filled"
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleCloseAlert}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error}
            </Alert>
          </div>
        )}

        {loadedSuccessfully && !error && (
          <div style={{ textAlign: 'center' }}>
            <Alert
              variant="filled"
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleCloseAlert}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Se ha cargado correctamente las asignaturas
            </Alert>
          </div>
        )}
        <br />



        <TableContainer component={Paper}>
          <Autocomplete
            options={filteredAsignaturas}
            getOptionLabel={(asignatura) => `${asignatura.codAsig} - ${asignatura.nomAsig}`}
            value={asignaturas.find((asignatura) => asignatura.codAsig === searchValue) || null}
            onChange={(event, newValue) => setSearchValue(newValue?.codAsig || '')}
            renderInput={(params) => <TextField {...params} label="Buscar Asignatura" />}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Nivel</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Limite Estudiantes</TableCell>
                <TableCell>Inscritos</TableCell>
                <TableCell>Número Carrera</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
            {filteredAsignaturas.map((asignatura) => (
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
    <TableCell>{alumnosInscritos[asignatura.codAsig]}</TableCell>
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
