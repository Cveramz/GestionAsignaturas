package com.example.demo.service;

import com.example.demo.model.Inscripcion;
import com.example.demo.repository.InscripcionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InscripcionService {

    private final InscripcionRepository inscripcionRepository;

    @Autowired
    public InscripcionService(InscripcionRepository inscripcionRepository) {
        this.inscripcionRepository = inscripcionRepository;
    }

    public List<Inscripcion> getAllInscripciones() {
        return inscripcionRepository.findAll();
    }

    public Optional<Inscripcion> getInscripcionById(Long id) {
        return inscripcionRepository.findById(id);
    }

    public Inscripcion saveInscripcion(Inscripcion inscripcion) {
        return inscripcionRepository.save(inscripcion);
    }

    public void deleteInscripcion(Long id) {
        inscripcionRepository.deleteById(id);
    }

    public List<Inscripcion> getInscripcionesByRutEstudiante(String rutEstudiante) {
        return inscripcionRepository.findByRutEstudiante(rutEstudiante);
    }

    public Inscripcion saveOrUpdateEstado(Inscripcion inscripcion) {

        String rutEstudiante = inscripcion.getRutEstudiante();
        String codAsignatura = inscripcion.getCodAsignatura();
        Optional<Inscripcion> existingInscripcion = inscripcionRepository.findByRutEstudianteAndCodAsignatura(rutEstudiante, codAsignatura);

        if (existingInscripcion.isPresent()) {
            // Ya existe una inscripción, actualiza el estado
            Inscripcion existing = existingInscripcion.get();
            existing.setEstado(inscripcion.getEstado());
            return inscripcionRepository.save(existing);
        } else {
            // No existe una inscripción, crea una nueva
            return inscripcionRepository.save(inscripcion);
        }
    }

    public int getCountByCodAsignatura(String codAsignatura) {
        return inscripcionRepository.countByCodAsignatura(codAsignatura);
    }

}
