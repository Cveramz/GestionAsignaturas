package com.example.demo.controller;

import com.example.demo.model.Asignatura;
import com.example.demo.service.AsignaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asignaturas")
@CrossOrigin(origins = "*")
public class AsignaturaController {

    private final AsignaturaService asignaturaService;

    @Autowired
    public AsignaturaController(AsignaturaService asignaturaService) {
        this.asignaturaService = asignaturaService;
    }

    @GetMapping
    @ResponseBody

    public List<Asignatura> getAllAsignaturas() {
        return asignaturaService.getAllAsignaturas();
    }

    @GetMapping("/{id}")
    @ResponseBody
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

    @GetMapping("/carrera/{codCarr}")
    @ResponseBody
    public List<Asignatura> getAsignaturasByCodCarr(@PathVariable int codCarr) {
        return asignaturaService.getAsignaturasByCodCarr(codCarr);
    }
}
