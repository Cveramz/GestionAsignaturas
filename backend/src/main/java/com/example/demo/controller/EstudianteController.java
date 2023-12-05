package com.example.demo.controller;

import com.example.demo.model.Estudiante;
import com.example.demo.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {

    private final EstudianteService estudianteService;

    @Autowired
    public EstudianteController(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    @GetMapping
    public List<Estudiante> getAllEstudiantes() {
        return estudianteService.getAllEstudiantes();
    }

    @GetMapping("/{rut}")
    public Estudiante getEstudianteByRut(@PathVariable String rut) {
        return estudianteService.getEstudianteByRut(rut).orElse(null);
    }

    @PostMapping
    public Estudiante saveEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteService.saveEstudiante(estudiante);
    }

    @DeleteMapping("/{rut}")
    public void deleteEstudiante(@PathVariable String rut) {
        estudianteService.deleteEstudiante(rut);
    }
}
