package pl.edu.pk.wieik.productionScheduler.parameter.model;

import jakarta.persistence.*;
import lombok.*;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ProductionProcess;
import pl.edu.pk.wieik.productionScheduler.task.model.ProductionProcessTask;

@Entity
@Table(name = "parameter")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Parameter {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;

	private String name;
	private Integer value;
	@Enumerated(EnumType.STRING)
	private Type type;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "productionProcessTaskId", referencedColumnName = "id")
	private ProductionProcessTask productionProcessTask;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "productionProcessId", referencedColumnName = "id")
	private ProductionProcess productionProcess;
}