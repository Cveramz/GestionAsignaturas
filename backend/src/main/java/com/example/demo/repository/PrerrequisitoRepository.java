package com.example.demo.repository;

import com.example.demo.model.Prerrequisito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrerrequisitoRepository extends JpaRepository<Prerrequisito, Long> {

}
