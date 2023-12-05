package com.example.demo.service;

import com.example.demo.model.Nota;
import com.example.demo.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotaService {

    private final NotaRepository notaRepository;

    @Autowired
    public NotaService(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    public List<Nota> getAllNotas() {
        return notaRepository.findAll();
    }

    public Optional<Nota> getNotaById(Long id) {
        return notaRepository.findById(id);
    }

    public Nota saveNota(Nota nota) {
        return notaRepository.save(nota);
    }

    public void deleteNota(Long id) {
        notaRepository.deleteById(id);
    }
}
