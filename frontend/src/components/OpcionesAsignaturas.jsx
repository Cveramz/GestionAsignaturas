import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OpcionesAsignaturas = ({ asignatura }) => {
    const [detalleAsignatura, setDetalleAsignatura] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.168.100.120:8080/asignaturas/${asignatura.codAsig}`);
                setDetalleAsignatura(response.data);
            } catch (error) {
                console.error('Error al obtener detalles de la asignatura', error);
            }
        };

        fetchData();
    }, [asignatura.codAsig]);

    const handleCerrarClick = () => {
        window.location.reload();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Card style={{ width: '80%' }}>
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <Button
                            variant="outlined"
                            onClick={handleCerrarClick}
                            style={{ color: 'red', borderColor: 'red' }}
                        >
                            Cerrar
                        </Button>

                    </div>
                    <Typography variant="h4" gutterBottom>
                        Detalles de la Asignatura
                    </Typography>
                    {detalleAsignatura && (
                        <div>
                            <table style={{ margin: 'auto' }}>
                                <tbody>
                                    <tr>
                                        <td>ID de la Asignatura:</td>
                                        <td>{detalleAsignatura.codAsig}</td>
                                    </tr>
                                    <tr>
                                        <td>Código de Plan:</td>
                                        <td>{detalleAsignatura.codPlan}</td>
                                    </tr>
                                    <tr>
                                        <td>Nivel:</td>
                                        <td>{detalleAsignatura.nivel}</td>
                                    </tr>
                                    <tr>
                                        <td>Nombre de la Asignatura:</td>
                                        <td>{detalleAsignatura.nomAsig}</td>
                                    </tr>
                                    <tr>
                                        <td>Límite de Estudiantes:</td>
                                        <td>{detalleAsignatura.limiteEstudiantes}</td>
                                    </tr>
                                    <tr>
                                        <td>Código de Carrera:</td>
                                        <td>{detalleAsignatura.codCarr}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div style={{ marginTop: '20px' }}>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: '#00A499', color: 'white', marginRight: '10px' }}
                                    onClick={() => console.log('Agregar Nuevo Horario')}
                                >
                                    Ver Horarios
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: '#EA7600', color: 'white', marginLeft: '10px' }}
                                    onClick={() => navigate(`/AdministrarHorario/${detalleAsignatura.codAsig}`)}
                                    
                                >
                                    Agregar Nuevo Horario
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default OpcionesAsignaturas;
