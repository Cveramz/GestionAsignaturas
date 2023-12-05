import React from 'react';
import { Typography, Paper, Container } from '@mui/material';

function InscripcionCursos() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Inscripción Cursos
        </Typography>
        <Typography variant="body1" paragraph>
          Explora las funcionalidades a través del menú de navegación.
        </Typography>
      </Paper>
    </Container>
  );
}

export default InscripcionCursos;
