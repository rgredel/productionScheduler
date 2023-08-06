package pl.edu.pk.wieik.productionScheduler.user.model;

import jakarta.persistence.*;
import lombok.*;
import pl.edu.pk.wieik.productionScheduler.task.model.ProductionProcessTask;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;

	@Column(unique=true)
	private String login;
	private String password;
	@Column(unique=true)
	private String email;
	private String fullName;
	@Enumerated(EnumType.STRING)
	private Role role;
	@OneToMany(mappedBy = "user")
	@ToString.Exclude
	private List<ProductionProcessTask> productionProcessTasks;
}