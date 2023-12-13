package com.example.demo.controller;

import com.example.demo.model.Inscripcion;
import com.example.demo.service.InscripcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/inscripciones")
public class InscripcionController {

    private final InscripcionService inscripcionService;

    @Autowired
    public InscripcionController(InscripcionService inscripcionService) {
        this.inscripcionService = inscripcionService;
    }

    @GetMapping
    public List<Inscripcion> getAllInscripciones() {
        return inscripcionService.getAllInscripciones();
    }

    @GetMapping("/{id}")
    public Inscripcion getInscripcionById(@PathVariable Long id) {
        return inscripcionService.getInscripcionById(id).orElse(null);
    }

    @PostMapping
    public Inscripcion saveInscripcion(@RequestBody Inscripcion inscripcion) {
        return inscripcionService.saveInscripcion(inscripcion);
    }

    @DeleteMapping("/{id}")
    public void deleteInscripcion(@PathVariable Long id) {
        inscripcionService.deleteInscripcion(id);
    }

    @GetMapping("/rut/{rutEstudiante}")
    public List<Inscripcion> getInscripcionesByRutEstudiante(@PathVariable String rutEstudiante) {
        return inscripcionService.getInscripcionesByRutEstudiante(rutEstudiante);
    }

    @PostMapping("/estado")
    public Inscripcion saveOrUpdateEstado(@RequestBody Inscripcion inscripcion) {
        return inscripcionService.saveOrUpdateEstado(inscripcion);
    }

    @GetMapping("/count/{codAsignatura}")
    public int getCountByCodAsignatura(@PathVariable String codAsignatura) {
        return inscripcionService.getCountByCodAsignatura(codAsignatura);
    }

}
