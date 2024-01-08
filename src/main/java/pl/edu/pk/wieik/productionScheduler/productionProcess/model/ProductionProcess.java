package pl.edu.pk.wieik.productionScheduler.productionProcess.model;

import jakarta.persistence.*;
import lombok.*;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Parameter;
import pl.edu.pk.wieik.productionScheduler.task.model.ProductionProcessTask;
import pl.edu.pk.wieik.productionScheduler.user.model.User;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;
}
