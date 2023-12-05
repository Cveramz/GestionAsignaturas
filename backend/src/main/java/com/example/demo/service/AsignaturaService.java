package com.example.demo.service;

import com.example.demo.model.Asignatura;
import com.example.demo.repository.AsignaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AsignaturaService {

    private final AsignaturaRepository asignaturaRepository;

    @Autowired
    public AsignaturaService(AsignaturaRepository asignaturaRepository) {
        this.asignaturaRepository = asignaturaRepository;
    }

    public List<Asignatura> getAllAsignaturas() {
        return asignaturaRepository.findAll();
    }

    public Optional<Asignatura> getAsignaturaById(Long id) {
        return asignaturaRepository.findById(id);
    }

    public Asignatura saveAsignatura(Asignatura asignatura) {
        return asignaturaRepository.save(asignatura);
    }

    public void deleteAsignatura(Long id) {
        asignaturaRepository.deleteById(id);
    }
}
