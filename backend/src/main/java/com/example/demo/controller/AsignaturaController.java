package com.example.demo.controller;

import com.example.demo.model.Asignatura;
import com.example.demo.service.AsignaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asignaturas")
public class AsignaturaController {

    private final AsignaturaService asignaturaService;

    @Autowired
    public AsignaturaController(AsignaturaService asignaturaService) {
        this.asignaturaService = asignaturaService;
    }

    @GetMapping
    public List<Asignatura> getAllAsignaturas() {
        return asignaturaService.getAllAsignaturas();
    }

    @GetMapping("/{id}")
    public Asignatura getAsignaturaById(@PathVariable Long id) {
        return asignaturaService.getAsignaturaById(id).orElse(null);
    }

    @PostMapping
    public Asignatura saveAsignatura(@RequestBody Asignatura asignatura) {
        return asignaturaService.saveAsignatura(asignatura);
    }

    @DeleteMapping("/{id}")
    public void deleteAsignatura(@PathVariable Long id) {
        asignaturaService.deleteAsignatura(id);
    }
}
