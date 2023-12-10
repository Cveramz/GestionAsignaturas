package com.example.demo.controller;

import com.example.demo.model.Prerrequisito;
import com.example.demo.service.PrerrequisitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/prerrequisitos")
public class PrerrequisitoController {

    private final PrerrequisitoService prerrequisitoService;

    @Autowired
    public PrerrequisitoController(PrerrequisitoService prerrequisitoService) {
        this.prerrequisitoService = prerrequisitoService;
    }

    @GetMapping
    public List<Prerrequisito> getAllPrerrequisitos() {
        return prerrequisitoService.getAllPrerrequisitos();
    }

    @GetMapping("/{id}")
    public Prerrequisito getPrerrequisitoById(@PathVariable Long id) {
        return prerrequisitoService.getPrerrequisitoById(id).orElse(null);
    }

    @PostMapping
    public Prerrequisito savePrerrequisito(@RequestBody Prerrequisito prerrequisito) {
        return prerrequisitoService.savePrerrequisito(prerrequisito);
    }

    @DeleteMapping("/{id}")
    public void deletePrerrequisito(@PathVariable Long id) {
        prerrequisitoService.deletePrerrequisito(id);
    }

    @GetMapping("/abre/{codPrerrequisito}")
    @ResponseBody
    public List<Prerrequisito> getPrerrequisitosByCodPrerrequisito(@PathVariable int codPrerrequisito) {
        return prerrequisitoService.getPrerrequisitosByCodPrerrequisito(codPrerrequisito);
    }

    @GetMapping("/para/{codAsignatura}")
    @ResponseBody
    public List<Prerrequisito> getPrerrequisitosByCodAsignatura(@PathVariable int codAsignatura) {
        return prerrequisitoService.getPrerrequisitosByCodAsignatura(codAsignatura);
    }
}
