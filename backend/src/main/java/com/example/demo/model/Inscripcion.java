package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Inscripciones")
public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Inscripcion")
    private Long idInscripcion;

    @Column(name = "Fecha_Inscripcion")
    private LocalDate fechaInscripcion;

    @ManyToOne
    @JoinColumn(name = "Rut", nullable = false)
    private Estudiante estudiante;

    @ManyToOne
    @JoinColumn(name = "Cod_Asig", nullable = false)
    private Asignatura asignatura;

    // Otros campos y relaciones según tu modelo
}
