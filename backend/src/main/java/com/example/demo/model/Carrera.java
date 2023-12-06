package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "carreras")
public class Carrera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_carr")
    private int codCarr;

    @Column(name = "nombre_carrera")
    private String nombreCarrera;
}
