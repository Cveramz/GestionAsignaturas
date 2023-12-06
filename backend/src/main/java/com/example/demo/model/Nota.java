package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "notas")
public class Nota {

    @Id
    @Column(name = "id_nota")
    private Long idNota;

    @Column(name = "anio")
    private int anio;

    @Column(name = "sem")
    private int sem;

    @Column(name = "nota")
    private double nota;

    @Column(name = "rut")
    private String rutEstudiante;

    @Column(name = "cod_asig")
    private int codAsignatura;

}
