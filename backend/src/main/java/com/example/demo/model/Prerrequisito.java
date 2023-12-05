package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "Prerrequisitos")
public class Prerrequisito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Prerrequisito")
    private Long idPrerrequisito;

    @ManyToOne
    @JoinColumn(name = "Cod_Asig", nullable = false)
    private Asignatura asignatura;

    @ManyToOne
    @JoinColumn(name = "Cod_Prerrequisito", nullable = false)
    private Asignatura prerrequisito;

    // Otros campos y relaciones según tu modelo
}
