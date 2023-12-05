package com.example.demo.service;

import com.example.demo.model.Prerrequisito;
import com.example.demo.repository.PrerrequisitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrerrequisitoService {

    private final PrerrequisitoRepository prerrequisitoRepository;

    @Autowired
    public PrerrequisitoService(PrerrequisitoRepository prerrequisitoRepository) {
        this.prerrequisitoRepository = prerrequisitoRepository;
    }

    public List<Prerrequisito> getAllPrerrequisitos() {
        return prerrequisitoRepository.findAll();
    }

    public Optional<Prerrequisito> getPrerrequisitoById(Long id) {
        return prerrequisitoRepository.findById(id);
    }

    public Prerrequisito savePrerrequisito(Prerrequisito prerrequisito) {
        return prerrequisitoRepository.save(prerrequisito);
    }

    public void deletePrerrequisito(Long id) {
        prerrequisitoRepository.deleteById(id);
    }
}
