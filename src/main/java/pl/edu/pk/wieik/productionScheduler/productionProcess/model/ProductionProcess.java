package pl.edu.pk.wieik.productionScheduler.productionProcess.model;

import jakarta.persistence.*;
import lombok.*;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Parameter;
import pl.edu.pk.wieik.productionScheduler.schedule.model.Schedule;
import pl.edu.pk.wieik.productionScheduler.task.model.ProductionProcessTask;

import java.util.List;

@Entity
@Table(name = "productionProcess")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class ProductionProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "productionProcess", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Parameter> parameters;
    @OneToMany(mappedBy = "productionProcess", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductionProcessTask> productionProcessTasks;
    @OneToMany(mappedBy = "productionProcess", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedules;
}
