package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "Carreras")
public class Carrera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cod_Carr")
    private Long codCarr;

    @Column(name = "Nombre_Carrera")
    private String nombreCarrera;

    @OneToMany(mappedBy = "carrera")
    private List<Asignatura> asignaturas;

    @OneToMany(mappedBy = "carrera")
    private List<Estudiante> estudiantes;
}
