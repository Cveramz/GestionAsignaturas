package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "inscripciones")
public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inscripcion")
    private Long idInscripcion;

    @Column(name = "fecha_inscripcion")
    private Date fechaInscripcion;

    @Column(name = "rut")
    private String rutEstudiante;

    @Column(name = "cod_asig")
    private String codAsignatura;


}
