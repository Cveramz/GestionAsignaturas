import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Container,
  Divider,
  Alert,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Malla from './Malla';

function GestionarEstudiantes() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [carreraName, setCarreraName] = useState(null);
  const [openMallaModal, setOpenMallaModal] = useState(false);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/estudiantes');
      setOptions(response.data.filter(estudiante => estudiante.rut));
      setError(null);
    } catch (error) {
      console.error('Error al cargar estudiantes:', error);
      setError('Error al cargar los estudiantes, vuelva a intentarlo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadStudents();
    }
  }, [open]);

  const handleStudentChange = async (event, value) => {
    if (value) {
      setSelectedStudent(value);

      try {
        const carreraResponse = await axios.get(`http://localhost:8080/carreras/${value.codCarr}`);
        setCarreraName(carreraResponse.data.nombreCarrera);
      } catch (error) {
        console.error('Error al cargar la carrera:', error);
        setCarreraName(null);
      }
    } else {
      setSelectedStudent(null);
      setCarreraName(null);
    }
  };

  const handleOpenMallaModal = () => {
    setOpenMallaModal(true);
  };

  const handleCloseMallaModal = () => {
    setOpenMallaModal(false);
  };

  return (
    <div>
      <br />
      <Typography variant="h4">Gestionar Estudiantes</Typography>
      <Divider />
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        {error && <Alert severity="error">{error}</Alert>}
        {!error && (
          <Alert severity={selectedStudent ? 'success' : 'info'}>
            {selectedStudent
              ? `Estudiante cargado correctamente`
              : 'Seleccione un estudiante a continuación'}
          </Alert>
        )}
      </div>
      <div className='SeleccionEstudiante' style={{ maxWidth: '300px' }}>
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.rut === value.rut}
          getOptionLabel={(option) => option.rut}
          options={options}
          loading={loading}
          onChange={handleStudentChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccionar Estudiante"
              size="small"
              fullWidth
            />
          )}
        />
      </div>
      <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
        {selectedStudent && (
          <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'left' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
              Información Estudiante
            </Typography>
            <Divider />
            <Typography variant="body1" paragraph>
              <strong>RUT:</strong> {selectedStudent.rut}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Nombres:</strong> {selectedStudent.nombres}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Apellidos:</strong> {selectedStudent.apellidos}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> {selectedStudent.email}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Código Carrera:</strong> {selectedStudent.codCarr}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Nombre Carrera:</strong> {carreraName || 'Cargando...'}
            </Typography>

            {/* Botones en la parte inferior */}
            <Grid container spacing={2} justifyContent="space-evenly">
              <Grid item>
                <Button variant="contained" color="primary">
                  Inscribir Asignaturas
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleOpenMallaModal}>
                  Ver Malla
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Ver Horario
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Ver Notas
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Modal para "Ver Malla" */}
        <Dialog open={openMallaModal} onClose={handleCloseMallaModal} fullWidth maxWidth="xl">
          <DialogTitle>
            Visualización de Malla Curricular
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseMallaModal}
              aria-label="close"
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <hr />
          </DialogTitle>
          <DialogContent>
            {/* Contenido del modal */}
            {selectedStudent && (
              // Aquí agregamos el componente Malla y pasamos los propios rut y código de carrera
              <Malla rut={selectedStudent.rut} codigoCarrera={selectedStudent.codCarr} />
            )}
          </DialogContent>
          <DialogActions>
            {/* Acciones adicionales del modal si es necesario */}
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default GestionarEstudiantes;
