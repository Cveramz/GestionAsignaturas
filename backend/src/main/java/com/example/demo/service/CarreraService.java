package com.example.demo.service;

import com.example.demo.model.Carrera;
import com.example.demo.repository.CarreraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarreraService {

    private final CarreraRepository carreraRepository;

    @Autowired
    public CarreraService(CarreraRepository carreraRepository) {
        this.carreraRepository = carreraRepository;
    }

    public List<Carrera> getAllCarreras() {
        return carreraRepository.findAll();
    }

    public Optional<Carrera> getCarreraById(Long id) {
        return carreraRepository.findById(id);
    }

    public Carrera saveCarrera(Carrera carrera) {
        return carreraRepository.save(carrera);
    }

    public void deleteCarrera(Long id) {
        carreraRepository.deleteById(id);
    }
}
