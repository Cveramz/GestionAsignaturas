package com.example.demo.service;

import com.example.demo.model.Horario;
import com.example.demo.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HorarioService {

    private final HorarioRepository horarioRepository;

    @Autowired
    public HorarioService(HorarioRepository horarioRepository) {
        this.horarioRepository = horarioRepository;
    }

    public List<Horario> getAllHorarios() {
        return horarioRepository.findAll();
    }

    public Optional<Horario> getHorarioById(Long id) {
        return horarioRepository.findById(id);
    }

    public Horario saveHorario(Horario horario) {
        return horarioRepository.save(horario);
    }

    public void deleteHorario(Long id) {
        horarioRepository.deleteById(id);
    }
}
