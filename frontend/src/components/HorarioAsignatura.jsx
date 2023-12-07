import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Paper, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

function HorarioAsignatura() {
    const { id } = useParams();
    const [nombreAsignatura, setNombreAsignatura] = useState('');
    const [horarioBloques, setHorarioBloques] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/asignaturas/${id}`)
            .then(response => {
                setNombreAsignatura(response.data.nomAsig);
            })
            .catch(error => {
                console.error('Hubo un error!', error);
            });

        // Obtener bloques del backend y guardarlos en el estado
        axios.get(`http://localhost:8080/horarios/asignatura/${id}`)
            .then(response => {
                setHorarioBloques(response.data.map(item => item.bloque));
            })
            .catch(error => {
                console.error('Hubo un error al obtener los bloques del horario:', error);
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

    const isBloqueColoreado = (bloque) => {
        return horarioBloques.includes(bloque);
    };

    return (
        <div>
            <br />
            <Typography variant="h4">Visualizar Horario</Typography>
            <hr />
            <Typography variant="h5">Asignatura seleccionada: {nombreAsignatura}</Typography>
            <Link to="/GestionarAsignaturas">
            <Button variant="outlined" style={{ backgroundColor: 'red', color: 'white', width: '100%' }} >
                    Volver
                </Button>
            </Link>
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
                                                            color="primary"
                                                            fullWidth
                                                            style={{ backgroundColor: isBloqueColoreado(modulo) ? 'green' : 'white' }}
                                                            disabled
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

export default HorarioAsignatura;
