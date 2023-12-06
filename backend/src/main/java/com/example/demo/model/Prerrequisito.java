package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "prerrequisitos")
public class Prerrequisito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prerrequisito")
    private Long idPrerrequisito;

    @Column(name = "cod_prerrequisito")
    private int codPrerrequisito;

    @Column(name = "cod_asig")
    private int codAsignatura;


}
