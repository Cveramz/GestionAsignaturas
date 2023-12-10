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
} from '@mui/material';

const Malla = ({ rut, codigoCarrera }) => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsignatura, setSelectedAsignatura] = useState(null);
  const [prerrequisitos, setPrerrequisitos] = useState({ abre: [], para: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/asignaturas/carrera/${codigoCarrera}`
        );
        setAsignaturas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [codigoCarrera]);

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
                {matrizAsignaturas.map((nivel, columnIndex) => (
                  <TableCell
                    key={columnIndex}
                    sx={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => handleCellClick(nivel[rowIndex])}
                  >
                    {nivel[rowIndex] ? nivel[rowIndex].nomAsig : ''}
                  </TableCell>
                ))}
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
          <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', p: 2, width: '300px' }}>
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
                            {prerrequisitoAsignatura ? `${prerrequisitoAsignatura.nomAsig} (Nivel: ${prerrequisitoAsignatura.nivel})` : ''}
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
                            {prerrequisitoAsignatura ? `${prerrequisitoAsignatura.nomAsig} (Nivel: ${prerrequisitoAsignatura.nivel})` : ''}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
                {prerrequisitos.para.length === 0 && prerrequisitos.abre.length === 0 && (
                  <p>No hay ramos que deba aprobar ni ramos que abra.</p>
                )}
                <Button onClick={handleCloseModal}>Cerrar</Button>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default Malla;
