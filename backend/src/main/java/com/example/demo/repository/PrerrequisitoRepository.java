package com.example.demo.repository;

import com.example.demo.model.Prerrequisito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrerrequisitoRepository extends JpaRepository<Prerrequisito, Long> {
    List<Prerrequisito> findByCodPrerrequisito(int codPrerrequisito);

    List<Prerrequisito> findByCodAsignatura(int codAsignatura);

}
