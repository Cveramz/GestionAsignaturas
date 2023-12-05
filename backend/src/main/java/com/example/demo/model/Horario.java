package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "Horarios")
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Horario")
    private Long idHorario;

    @Column(name = "Dia_Semana")
    private String diaSemana;

    @Column(name = "Bloque")
    private String bloque;

    @ManyToOne
    @JoinColumn(name = "Cod_Asig", nullable = false)
    private Asignatura asignatura;

    // Otros campos y relaciones según tu modelo
}
