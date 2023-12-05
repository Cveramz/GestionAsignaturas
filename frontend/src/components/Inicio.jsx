import React from 'react';
import { Typography, Paper, Container } from '@mui/material';

function Inicio() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido a la Aplicación de Gestión de Inscripción de Asignaturas
        </Typography>
        <Typography variant="body1" paragraph>
          Explora las funcionalidades a través del menú de navegación.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Inicio;
