import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  Alert,
} from '@mui/material';

function TablaHorariosEstudiante({ rutEstudiante }) {
  const [inscripciones, setInscripciones] = useState([]);
  const [horariosAsignaturas, setHorariosAsignaturas] = useState([]);
  const [coloresAsignaturas, setColoresAsignaturas] = useState({});
  const [nombresAsignaturas, setNombresAsignaturas] = useState({});
  const [alertaSinHorario, setAlertaSinHorario] = useState(false);

  const obtenerDatosAsignatura = async (inscripcion) => {
    try {
      const nombreResponse = await axios.get(`http://localhost:8080/asignaturas/${inscripcion.codAsignatura}`);
      const nombreAsignatura = nombreResponse.data.nomAsig;

      const horarioResponse = await axios.get(`http://localhost:8080/horarios/asignatura/${inscripcion.codAsignatura}`);
      const bloques = horarioResponse.data.map(item => item.bloque);

      if (bloques.length === 0) {
        // Mostrar alerta si la asignatura no tiene horario
        setAlertaSinHorario(true);
      }

      return { codAsignatura: inscripcion.codAsignatura, nombre: nombreAsignatura, bloques };
    } catch (error) {
      console.error(`Hubo un error al obtener la información para la asignatura ${inscripcion.codAsignatura}:`, error);
      return { codAsignatura: inscripcion.codAsignatura, nombre: 'Nombre Desconocido', bloques: [] };
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/inscripciones/rut/${rutEstudiante}`)
      .then(response => {
        setInscripciones(response.data);

        const asignaturasCursando = response.data.filter(inscripcion => inscripcion.estado === 'cursando');
        const asignaturasPromises = asignaturasCursando.map(obtenerDatosAsignatura);

        Promise.all(asignaturasPromises)
          .then(results => {
            setHorariosAsignaturas(results);
            asignarColoresAleatorios(results);
            asignarNombresAsignaturas(results);
          });
      })
      .catch(error => {
        console.error('Hubo un error al obtener las inscripciones:', error);
      });
  }, [rutEstudiante]);

  const dias = ['L', 'M', 'W', 'J', 'V', 'S'];

  const nomDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const bloquesHorarios = [
    { horario: '08:15 - 09:35', label: 'Bloque 1' },
    { horario: '09:50 - 11:10', label: 'Bloque 2' },
    { horario: '11:25 - 12:45', label: 'Bloque 3' },
    { horario: 'Almuerzo', label: 'Almuerzo' },
    { horario: '13:45 - 15:05', label: 'Bloque 4' },
    { horario: '15:20 - 16:40', label: 'Bloque 5' },
    { horario: '16:55 - 18:15', label: 'Bloque 6' },
    { horario: 'Horario Nocturno', label: 'Horario Nocturno' },
    { horario: '18:45 - 20:05', label: 'Bloque 7' },
    { horario: '20:05 - 21:25', label: 'Bloque 8' },
    { horario: '21:25 - 22:45', label: 'Bloque 9' },
  ];

  const asignarColoresAleatorios = (asignaturas) => {
    const coloresDisponibles = ['#F16243', '#F1B443', '#DFF143', '#8FF143', '#43F175', '#43F1E6', '#43AFF1', '#8843F1'];
    const asignaturasColoreadas = {};

    asignaturas.forEach(asignatura => {
      const colorIndex = Math.floor(Math.random() * coloresDisponibles.length);
      const colorAsignado = coloresDisponibles.splice(colorIndex, 1)[0];
      asignaturasColoreadas[asignatura.codAsignatura] = colorAsignado;
    });

    setColoresAsignaturas(asignaturasColoreadas);
  };

  const asignarNombresAsignaturas = (asignaturas) => {
    const nombresAsignaturas = {};
    asignaturas.forEach(asignatura => {
      nombresAsignaturas[asignatura.codAsignatura] = asignatura.nombre;
    });
    setNombresAsignaturas(nombresAsignaturas);
  };

  const isBloqueColoreado = (diaLabel) => {
    const asignaturasCoincidentes = horariosAsignaturas.filter(asignatura =>
      asignatura.bloques.includes(diaLabel)
    );

    if (asignaturasCoincidentes.length > 1) {
      return { color: 'red', asignatura: null };
    } else if (asignaturasCoincidentes.length === 1) {
      const asignatura = asignaturasCoincidentes[0];
      return { color: coloresAsignaturas[asignatura.codAsignatura], asignatura };
    } else {
      return { color: null, asignatura: null };
    }
  };

  return (
    <div>
      {alertaSinHorario && (
        <Alert severity="warning" onClose={() => setAlertaSinHorario(false)}>
          Al menos una asignatura no tiene horario asignado.
        </Alert>
      )}

      <Typography variant="h5">Horarios de asignaturas cursando:</Typography>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bloque Horario</TableCell>
                {nomDias.map(dia => (
                  <TableCell key={dia}>{dia}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {bloquesHorarios.map(({ horario, label }, index) => (
                <TableRow key={index}>
                  <TableCell>{(label === 'Almuerzo' || label === 'Horario Nocturno') ? label : `${horario} - ${label}`}</TableCell>
                  {dias.map((dia, diaIndex) => (
                    <TableCell key={diaIndex}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{
                          backgroundColor: isBloqueColoreado(`${dia}${label.substring(label.length - 1)}`).color || 'white',
                          color: 'white',
                        }}
                        disabled
                      >
                        {isBloqueColoreado(`${dia}${label.substring(label.length - 1)}`).asignatura
                          ? `${dia}${label.substring(label.length - 1)} - ${nombresAsignaturas[isBloqueColoreado(`${dia}${label.substring(label.length - 1)}`).asignatura.codAsignatura]}`
                          : '*tope*'}
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default TablaHorariosEstudiante;
