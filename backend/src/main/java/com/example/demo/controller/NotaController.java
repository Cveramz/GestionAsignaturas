package com.example.demo.controller;

import com.example.demo.model.Nota;
import com.example.demo.service.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/notas")
public class NotaController {

    private final NotaService notaService;

    @Autowired
    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @GetMapping
    public List<Nota> getAllNotas() {
        return notaService.getAllNotas();
    }

    @GetMapping("/{id}")
    public Nota getNotaById(@PathVariable Long id) {
        return notaService.getNotaById(id).orElse(null);
    }

    @PostMapping
    public Nota saveNota(@RequestBody Nota nota) {
        return notaService.saveNota(nota);
    }

    @DeleteMapping("/{id}")
    public void deleteNota(@PathVariable Long id) {
        notaService.deleteNota(id);
    }
}
