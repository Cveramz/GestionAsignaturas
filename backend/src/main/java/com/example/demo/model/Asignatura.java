package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "asignaturas")
public class Asignatura {

    @Id
    @Column(name = "cod_asig")
    private int codAsig;

    @Column(name = "cod_plan")
    private String codPlan;

    @Column(name = "nivel")
    private int nivel;

    @Column(name = "nom_asig")
    private String nomAsig;

    @Column(name = "limite_estudiantes")
    private int limiteEstudiantes;

    @Column(name = "cod_carr")
    private int codCarr;

}
