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
  Modal,
  Backdrop,
  Fade,
  Button,
  Snackbar,
} from '@mui/material';

const Malla = ({ rut, codigoCarrera }) => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsignatura, setSelectedAsignatura] = useState(null);
  const [prerrequisitos, setPrerrequisitos] = useState({ abre: [], para: [] });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchData = async () => {
    try {
      const asignaturasResponse = await axios.get(`http://localhost:8080/asignaturas/carrera/${codigoCarrera}`);
      const inscripcionesResponse = await axios.get(`http://localhost:8080/inscripciones/rut/${rut}`);

      setAsignaturas(asignaturasResponse.data);
      setInscripciones(inscripcionesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [codigoCarrera, rut]);

  const maxNivel = asignaturas.reduce((max, asignatura) => Math.max(max, asignatura.nivel), 0);

  const matrizAsignaturas = Array.from({ length: maxNivel }, () => []);

  asignaturas.forEach((asignatura) => {
    matrizAsignaturas[asignatura.nivel - 1].push(asignatura);
  });

  const handleCellClick = async (asignatura) => {
    setSelectedAsignatura(asignatura);
    setModalOpen(true);

    try {
      const prerrequisitosAbreResponse = await axios.get(
        `http://localhost:8080/prerrequisitos/abre/${asignatura.codAsig}`
      );
      const prerrequisitosParaResponse = await axios.get(
        `http://localhost:8080/prerrequisitos/para/${asignatura.codAsig}`
      );

      setPrerrequisitos({
        abre: prerrequisitosAbreResponse.data,
        para: prerrequisitosParaResponse.data,
      });
    } catch (error) {
      console.error('Error fetching prerrequisitos:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSetEstado = async (estado) => {
    try {
      await axios.post('http://localhost:8080/inscripciones/estado', {
        rutEstudiante: rut,
        codAsignatura: selectedAsignatura.codAsig,
        estado: estado,
      });

      fetchData();
      setSnackbarMessage(`Se actualizó el estado a "${estado}" correctamente.`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error setting estado:', error);
    }
  };

  const handleEliminarEstado = async () => {
    try {
      const inscripcion = inscripciones.find(
        (inscripcion) => inscripcion.codAsignatura === String(selectedAsignatura.codAsig)
      );

      if (inscripcion) {
        await axios.delete(`http://localhost:8080/inscripciones/${inscripcion.idInscripcion}`);
        fetchData();
        setSnackbarMessage('Se eliminó el estado correctamente.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error deleting estado:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
            {Array.from({ length: Math.max(...matrizAsignaturas.map((nivel) => nivel.length)) }, (_, rowIndex) => (
              <TableRow key={rowIndex}>
                {matrizAsignaturas.map((nivel, columnIndex) => {
                  const currentAsignatura = nivel[rowIndex];

                  if (currentAsignatura) {
                    const inscripcion = inscripciones.find(
                      (inscripcion) => inscripcion.codAsignatura === String(currentAsignatura.codAsig)
                    );

                    const isCursando = inscripcion && inscripcion.estado === 'cursando';

                    const styles = {
                      border: '1px solid #ddd',
                      padding: '8px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: isCursando
                        ? '#F8CA00'
                        : inscripcion && inscripcion.estado === 'aprobado'
                        ? '#9bc99e'
                        : inscripcion && inscripcion.estado === 'reprobado'
                        ? 'red'
                        : 'white',
                    };

                    return (
                      <TableCell
                        key={columnIndex}
                        sx={styles}
                        onClick={() => handleCellClick(currentAsignatura)}
                      >
                        {currentAsignatura.nomAsig}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={columnIndex} sx={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                        {/* Puedes dejar esto vacío o mostrar algún mensaje indicando que no hay asignatura */}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Paper
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              p: 2,
              width: '300px',
            }}
          >
            {/* Contenido del modal */}
            {selectedAsignatura && (
              <>
                <h2>{selectedAsignatura.nomAsig}</h2>
                {prerrequisitos.para.length > 0 && (
                  <>
                    <h3>Asignaturas que debe aprobar:</h3>
                    <ul>
                      {prerrequisitos.para.map((prerrequisito) => {
                        const prerrequisitoAsignatura = asignaturas.find(
                          (asignatura) => asignatura.codAsig === prerrequisito.codPrerrequisito
                        );

                        return (
                          <li key={prerrequisito.idPrerrequisito}>
                            {prerrequisitoAsignatura
                              ? `${prerrequisitoAsignatura.nomAsig} (Nivel: ${prerrequisitoAsignatura.nivel})`
                              : ''}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
                {prerrequisitos.abre.length > 0 && (
                  <>
                    <h3>Asignaturas que abre:</h3>
                    <ul>
                      {prerrequisitos.abre.map((prerrequisito) => {
                        const prerrequisitoAsignatura = asignaturas.find(
                          (asignatura) => asignatura.codAsig === prerrequisito.codAsignatura
                        );

                        return (
                          <li key={prerrequisito.idPrerrequisito}>
                            {prerrequisitoAsignatura
                              ? `${prerrequisitoAsignatura.nomAsig} (Nivel: ${prerrequisitoAsignatura.nivel})`
                              : ''}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
                {prerrequisitos.para.length === 0 && prerrequisitos.abre.length === 0 && (
                  <p>No hay ramos que deba aprobar ni ramos que abra.</p>
                )}
                <Button onClick={() => handleSetEstado('cursando')} sx={buttonStylesYellow}>
                  Cursando
                </Button>
                <Button onClick={() => handleSetEstado('aprobado')} sx={buttonStylesGreen}>
                  Aprobado
                </Button>
                <Button onClick={() => handleSetEstado('reprobado')} sx={buttonStylesRed}>
                  Reprobado
                </Button>
                {inscripciones.some(
                  (inscripcion) => inscripcion.codAsignatura === String(selectedAsignatura.codAsig)
                ) && (
                  <Button onClick={handleEliminarEstado} sx={buttonStylesBlue}>
                    Eliminar Estado
                  </Button>
                )}
                <Button onClick={handleCloseModal} sx={buttonStylesGoogle}>
                  Cerrar
                </Button>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

const buttonStyles = {
  width: '100%',
  mb: 1, // Añade un margen en la parte inferior para separar los botones
};

const buttonStylesYellow = {
  ...buttonStyles,
  backgroundColor: '#F8CA00',
  color: 'white',
  '&:hover': {
    backgroundColor: '#F8CA00', // Color al pasar el mouse
  },
};

const buttonStylesGreen = {
  ...buttonStyles,
  backgroundColor: '#9bc99e',
  color: 'white',
  '&:hover': {
    backgroundColor: '#9bc99e', // Color al pasar el mouse
  },
};

const buttonStylesRed = {
  ...buttonStyles,
  backgroundColor: 'red',
  color: 'white',
  '&:hover': {
    backgroundColor: 'red', // Color al pasar el mouse
  },
};

const buttonStylesBlue = {
  ...buttonStyles,
  backgroundColor: 'blue',
  color: 'white',
  '&:hover': {
    backgroundColor: 'blue', // Color al pasar el mouse
  },
};

const buttonStylesGoogle = {
  ...buttonStyles,
  backgroundColor: '#4285F4',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4285F4', // Color al pasar el mouse
  },
};

export default Malla;
