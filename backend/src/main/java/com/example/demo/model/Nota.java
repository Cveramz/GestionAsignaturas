package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "Notas")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Nota")
    private Long idNota;

    @Column(name = "Anio")
    private int anio;

    @Column(name = "Sem")
    private int sem;

    @Column(name = "Nota")
    private double nota;

    @ManyToOne
    @JoinColumn(name = "Rut", nullable = false)
    private Estudiante estudiante;

    @ManyToOne
    @JoinColumn(name = "Cod_Asig", nullable = false)
    private Asignatura asignatura;

    // Otros campos y relaciones según tu modelo
}
