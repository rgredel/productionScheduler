package pl.edu.pk.wieik.productionScheduler.schedule.model;

import jakarta.persistence.*;
import lombok.*;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ProductionProcess;

@Entity
@Table(name = "schedule")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String file;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productionProcessId", referencedColumnName = "id")
    private ProductionProcess productionProcess;
}
