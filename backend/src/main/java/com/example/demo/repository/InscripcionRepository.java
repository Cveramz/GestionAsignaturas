package com.example.demo.repository;

import com.example.demo.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
    List<Inscripcion> findByRutEstudiante(String rutEstudiante);

    Optional<Inscripcion> findByRutEstudianteAndCodAsignatura(String rutEstudiante, String codAsignatura);

    int countByCodAsignatura(String codAsignatura);



}
