package pl.edu.pk.wieik.productionScheduler.task.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@AllArgsConstructor
public class CreateTaskDto {
    private String name;
    private String description;
}
