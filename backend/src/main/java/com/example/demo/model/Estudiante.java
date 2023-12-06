package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "estudiantes")
public class Estudiante {

    @Id
    @Column(name = "rut")
    private String rut;

    @Column(name = "nombres")
    private String nombres;

    @Column(name = "apellidos")
    private String apellidos;

    @Column(name = "email")
    private String email;

    @Column(name = "nivel")
    private int nivel;

    @Column(name = "cod_carr")
    private int codCarr;

}
