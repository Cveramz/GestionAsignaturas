package com.example.demo.controller;

import com.example.demo.model.Horario;
import com.example.demo.service.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/horarios")
public class HorarioController {

    private final HorarioService horarioService;

    @Autowired
    public HorarioController(HorarioService horarioService) {
        this.horarioService = horarioService;
    }

    @GetMapping
    public List<Horario> getAllHorarios() {
        return horarioService.getAllHorarios();
    }

    @GetMapping("/{id}")
    public Horario getHorarioById(@PathVariable Long id) {
        return horarioService.getHorarioById(id).orElse(null);
    }

    @PostMapping
    public Horario saveHorario(@RequestBody Horario horario) {
        return horarioService.saveHorario(horario);
    }

    @DeleteMapping("/{id}")
    public void deleteHorario(@PathVariable Long id) {
        horarioService.deleteHorario(id);
    }
}
