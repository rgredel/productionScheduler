package pl.edu.pk.wieik.productionScheduler.task.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Parameter;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ProductionProcess;
import pl.edu.pk.wieik.productionScheduler.user.model.Users;

import java.util.List;
import java.util.Objects;

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
    @OneToMany(mappedBy = "productionProcessTask", cascade = CascadeType.ALL, orphanRemoval = true)
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

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        ProductionProcessTask that = (ProductionProcessTask) object;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

