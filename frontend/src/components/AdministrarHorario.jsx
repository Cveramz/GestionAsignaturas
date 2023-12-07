import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Paper, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Snackbar } from '@mui/material';

function AdministrarHorario() {
    const { id } = useParams();
    const [nombreAsignatura, setNombreAsignatura] = useState('');
    const [botonesSeleccionados, setBotonesSeleccionados] = useState([]);
    const [datosGuardados, setDatosGuardados] = useState([]);
    const [mensajeSnackbar, setMensajeSnackbar] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/asignaturas/${id}`)
            .then(response => {
                setNombreAsignatura(response.data.nomAsig);
            })
            .catch(error => {
                console.error('Hubo un error!', error);
            });
    }, [id]);

    const dias = ['L', 'M', 'W', 'J', 'V', 'S'];

    const horarios = [
        { horario: '08:15 - 09:35', modulos: ['L1', 'M1', 'W1', 'J1', 'V1', 'S1'] },
        { horario: '09:50 - 11:10', modulos: ['L2', 'M2', 'W2', 'J2', 'V2', 'S2'] },
        { horario: '11:25 - 12:45', modulos: ['L3', 'M3', 'W3', 'J3', 'V3', 'S3'] },
        { horario: 'Almuerzo', modulos: ['-', '-', '-', '-', '-', '-'] },
        { horario: '13:45 - 15:05', modulos: ['L4', 'M4', 'W4', 'J4', 'V4', 'S4'] },
        { horario: '15:20 - 16:40', modulos: ['L5', 'M5', 'W5', 'J5', 'V5', 'S5'] },
        { horario: '16:55 - 18:15', modulos: ['L6', 'M6', 'W6', 'J6', 'V6', 'S6'] },
        { horario: 'Horario nocturno', modulos: ['-', '-', '-', '-', '-', '-'] },
        { horario: '18:45 - 20:05', modulos: ['L7', 'M7', 'W7', 'J7', 'V7', 'S7'] },
        { horario: '20:05 - 21:25', modulos: ['L8', 'M8', 'W8', 'J8', 'V8', 'S8'] },
        { horario: '21:25 - 22:45', modulos: ['L9', 'M9', 'W9', 'J9', 'V9', 'S9'] },
    ];

    const handleClick = (modulo) => {
        if (botonesSeleccionados.includes(modulo)) {
            // Si el botón ya está seleccionado, lo deseleccionamos
            setBotonesSeleccionados(botonesSeleccionados.filter(item => item !== modulo));
        } else {
            // Si el botón no está seleccionado, lo agregamos a la lista
            setBotonesSeleccionados([...botonesSeleccionados, modulo]);
        }
    };

    const mostrarSnackbar = (mensaje) => {
        setMensajeSnackbar(mensaje);
    };

    const cerrarSnackbar = () => {
        setMensajeSnackbar('');
    };

    const actualizarHorario = async () => {
        const bloquesSeleccionados = botonesSeleccionados.filter(modulo => modulo !== '-');
    
        if (bloquesSeleccionados.length !== 3) {
            mostrarSnackbar('Debe elegir exactamente 3 bloques.');
            return;
        }
    
        try {
            // Eliminar horarios existentes de la asignatura
            await axios.delete(`http://localhost:8080/horarios/asignatura/${id}`);
    
            // Enviar nuevos datos al backend
            for (const bloqueSeleccionado of bloquesSeleccionados) {
                const data = {
                    bloque: bloqueSeleccionado,
                    codAsignatura: id
                };
    
                await axios.post('http://localhost:8080/horarios', data);
            }
    
            console.log('Horarios existentes eliminados y nuevos datos guardados enviados al backend:', bloquesSeleccionados);
            mostrarSnackbar('Horarios existentes eliminados y nuevos datos guardados enviados al backend correctamente');
        } catch (error) {
            console.error('Error al enviar datos al backend:', error);
            mostrarSnackbar('Hubo un error al enviar los datos al backend');
        }
    };
    

    return (
        <div>
            <br />
            <Button variant="outlined" style={{ backgroundColor: 'red', color: 'white', width: '100%' }} onClick={() => window.history.back()}>
                Volver
            </Button>
            <br />
            <Typography variant="h4">Administrar Horario</Typography>
            <hr />
            <Typography variant="h5">Asignatura seleccionada: {nombreAsignatura}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button variant="contained" style={{ backgroundColor: '#ea7600' }} onClick={actualizarHorario}>
                        Actualizar Horario
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                open={mensajeSnackbar !== ''}
                autoHideDuration={3000}
                onClose={cerrarSnackbar}
                message={mensajeSnackbar}
            />
            <br />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Módulo</TableCell>
                                        {dias.map(dia => (
                                            <TableCell key={dia}>{dia}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {horarios.map(({ horario, modulos }, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{horario}</TableCell>
                                            {modulos.map((modulo, moduloIndex) => (
                                                <TableCell key={moduloIndex}>
                                                    {modulo !== '-' && (
                                                        <Button
                                                            variant="contained"
                                                            color={botonesSeleccionados.includes(modulo) ? 'success' : 'primary'}
                                                            style={{ backgroundColor: botonesSeleccionados.includes(modulo) ? '#00a499' : '#3f51b5', margin: '4px' }}
                                                            fullWidth
                                                            onClick={() => handleClick(modulo)}
                                                        >
                                                            {modulo}
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default AdministrarHorario;
