package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "horarios")
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_horario")
    private Long idHorario;

    @Column(name = "dia_semana")
    private String diaSemana;

    @Column(name = "bloque")
    private String bloque;

    @Column(name = "cod_asig")
    private String codAsignatura;
}
