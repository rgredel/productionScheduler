package pl.edu.pk.wieik.productionScheduler.task.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Parameter;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ProductionProcess;
import pl.edu.pk.wieik.productionScheduler.user.model.Users;

import java.util.List;

@Entity
@Table(name = "productionProcessTask")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class ProductionProcessTask {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @OneToMany(mappedBy = "productionProcessTask")
    @ToString.Exclude
    private List<Parameter> parameters;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "taskId", referencedColumnName = "id")
    private Task task;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productionProcessId", referencedColumnName = "id")
    private ProductionProcess productionProcess;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private Users user;

    @ManyToMany(mappedBy="previousProductionProcessTasks")
    @JsonIgnore
    private List<ProductionProcessTask> nextProductionProcessTasks;

    @ManyToMany
    private List<ProductionProcessTask> previousProductionProcessTasks;

}

