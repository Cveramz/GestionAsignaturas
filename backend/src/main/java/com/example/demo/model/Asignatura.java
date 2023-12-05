package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "Asignaturas")
public class Asignatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cod_Asig")
    private Long codAsig;

    @Column(name = "Cod_Plan")
    private String codPlan;

    @Column(name = "Nivel")
    private int nivel;

    @Column(name = "Nom_Asig")
    private String nomAsig;

    @Column(name = "Limite_Estudiantes")
    private int limiteEstudiantes;

    @Column(name = "Cont_Estudiantes")
    private int contEstudiantes;

    @ManyToOne
    @JoinColumn(name = "Cod_Carr", nullable = false)
    private Carrera carrera;
}
