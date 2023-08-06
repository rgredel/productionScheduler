package pl.edu.pk.wieik.productionScheduler.task.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "task")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Task{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String description;
    @OneToMany(mappedBy = "task")
    @ToString.Exclude
    private List<ProductionProcessTask> productionProcessTasks;


}

