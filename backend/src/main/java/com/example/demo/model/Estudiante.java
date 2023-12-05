package com.example.demo.model;

import lombok.Data;

import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "Estudiantes")
public class Estudiante {

    @Id
    @Column(name = "Rut")
    private String rut;

    @Column(name = "Nombres")
    private String nombres;

    @Column(name = "Apellidos")
    private String apellidos;

    @Column(name = "Email")
    private String email;

    @ManyToOne
    @JoinColumn(name = "Cod_Carr", nullable = false)
    private Carrera carrera;

    @OneToMany(mappedBy = "estudiante")
    private List<Nota> notas;

    // Otros campos y relaciones según tu modelo
}
