package com.example.demo.service;

import com.example.demo.model.Estudiante;
import com.example.demo.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {

    private final EstudianteRepository estudianteRepository;

    @Autowired
    public EstudianteService(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    public List<Estudiante> getAllEstudiantes() {
        return estudianteRepository.findAll();
    }

    public Optional<Estudiante> getEstudianteByRut(String rut) {
        return estudianteRepository.findById(rut);
    }

    public Estudiante saveEstudiante(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    public void deleteEstudiante(String rut) {
        estudianteRepository.deleteById(rut);
    }
}
