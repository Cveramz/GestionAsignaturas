import React from 'react';
import { Typography, Paper, Container } from '@mui/material';

function GestionarAsignaturas() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Gestionar asignaturas
        </Typography>
        <Typography variant="body1" paragraph>
          Explora las funcionalidades a través del menú de navegación.
        </Typography>
      </Paper>
    </Container>
  );
}

export default GestionarAsignaturas;
