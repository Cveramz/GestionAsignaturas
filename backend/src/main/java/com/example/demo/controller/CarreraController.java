package com.example.demo.controller;

import com.example.demo.model.Carrera;
import com.example.demo.service.CarreraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carreras")
public class CarreraController {

    private final CarreraService carreraService;

    @Autowired
    public CarreraController(CarreraService carreraService) {
        this.carreraService = carreraService;
    }

    @GetMapping
    public List<Carrera> getAllCarreras() {
        return carreraService.getAllCarreras();
    }

    @GetMapping("/{id}")
    public Carrera getCarreraById(@PathVariable Long id) {
        return carreraService.getCarreraById(id).orElse(null);
    }

    @PostMapping
    public Carrera saveCarrera(@RequestBody Carrera carrera) {
        return carreraService.saveCarrera(carrera);
    }

    @DeleteMapping("/{id}")
    public void deleteCarrera(@PathVariable Long id) {
        carreraService.deleteCarrera(id);
    }
}
