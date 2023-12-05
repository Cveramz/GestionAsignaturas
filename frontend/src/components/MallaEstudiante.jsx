import React from 'react';
import { Typography, Paper, Container } from '@mui/material';

function MallaEstudiante() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Malla Estudiante
        </Typography>
        <Typography variant="body1" paragraph>
          Explora las funcionalidades a través del menú de navegación.
        </Typography>
      </Paper>
    </Container>
  );
}

export default MallaEstudiante;
