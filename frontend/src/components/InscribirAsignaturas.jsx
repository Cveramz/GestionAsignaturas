import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const InscribirAsignaturas = () => {
  // Utilizamos el hook useParams para obtener el parámetro desde la URL
  const { id } = useParams();

  // Creamos un estado para almacenar el dato y actualizamos el estado con el valor de id
  const [dato, setDato] = useState('');

  useEffect(() => {
    // Actualizamos el estado con el valor de id cada vez que id cambia
    setDato(id);
  }, [id]);

  return (
    <div>
      <h1>Inscribir Asignaturas</h1>
      <p>El dato de la URL es: {dato}</p>
      {/* Aquí puedes renderizar el resto de tu contenido */}
    </div>
  );
};

export default InscribirAsignaturas;
