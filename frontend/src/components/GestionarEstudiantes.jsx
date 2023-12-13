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
import VerNotas from './VerNotas';
import HorarioEstudiante from './HorarioEstudiante';

function GestionarEstudiantes() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [carreraName, setCarreraName] = useState(null);
  const [openMallaModal, setOpenMallaModal] = useState(false);
  const [openNotasModal, setOpenNotasModal] = useState(false);
  const [openHorarioModal, setOpenHorarioModal] = useState(false); // Nuevo estado para el modal de horario
  const [selectedStudentForNotas, setSelectedStudentForNotas] = useState(null);
  const [searchMode, setSearchMode] = useState('rut');


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

  const handleOpenNotasModal = () => {
    setOpenNotasModal(true);
    setSelectedStudentForNotas(selectedStudent);
  };

  const handleCloseNotasModal = () => {
    setOpenNotasModal(false);
  };

  const handleOpenHorarioModal = () => {
    setOpenHorarioModal(true);
  };

  const handleCloseHorarioModal = () => {
    setOpenHorarioModal(false);
  };

  const filterStudents = (option, inputValue) => {
    if (searchMode === 'rut') {
      return option.rut.toLowerCase().includes(inputValue.toLowerCase());
    } else if (searchMode === 'name') {
      const fullName = `${option.nombres} ${option.apellidos}`;
      return fullName.toLowerCase().includes(inputValue.toLowerCase());
    }
    return false;
  };


  return (
    <div>
      <br />
      <Typography variant="h4">Gestionar Estudiantes</Typography>
      <Divider />
      <br />
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
      <br />
      <div className='SeleccionEstudiante' style={{ maxWidth: '300px' }}>
  <Autocomplete
    id="asynchronous-demo"
    sx={{ width: 300 }}
    open={open}
    onOpen={() => setOpen(true)}
    onClose={() => setOpen(false)}
    isOptionEqualToValue={(option, value) => option.rut === value.rut}
    getOptionLabel={(option) => option.rut}
    options={options}
    loading={loading}
    onChange={handleStudentChange}
    filterOptions={(options, { inputValue }) =>
      options.filter((option) =>
        option.rut.toLowerCase().includes(inputValue.toLowerCase()) ||
        `${option.nombres} ${option.apellidos}`.toLowerCase().includes(inputValue.toLowerCase())
      )
    }
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
                <Button variant="contained" color="primary" onClick={handleOpenHorarioModal}>
                  Ver Horario
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleOpenNotasModal}>
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
              <Malla rut={selectedStudent.rut} codigoCarrera={selectedStudent.codCarr} />
            )}
          </DialogContent>
          <DialogActions>
            {/* Acciones adicionales del modal si es necesario */}
          </DialogActions>
        </Dialog>

        {/* Modal para "Ver Horario" */}
        <Dialog open={openHorarioModal} onClose={handleCloseHorarioModal} fullWidth maxWidth="xl">
          <DialogTitle>
            Visualización de Horario
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseHorarioModal}
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
              <HorarioEstudiante rutEstudiante={selectedStudent.rut} />
            )}
          </DialogContent>
          <DialogActions>
            {/* Acciones adicionales del modal si es necesario */}
          </DialogActions>
        </Dialog>

        {/* Modal para "Ver Notas" */}
        <Dialog open={openNotasModal} onClose={handleCloseNotasModal} fullWidth maxWidth="xl">
          <DialogTitle>
            Visualización de Notas
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseNotasModal}
              aria-label="close"
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <hr />
          </DialogTitle>
          <DialogContent>
            {/* Contenido del modal de notas */}
            {selectedStudentForNotas && <VerNotas rut={selectedStudentForNotas.rut} />}
          </DialogContent>
          <DialogActions>
            {/* Acciones adicionales del modal de notas si es necesario */}
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default GestionarEstudiantes;
