package pl.edu.pk.wieik.productionScheduler.task.dto;


import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
public class CreateTaskDto {
    private String name;
    private String description;
}
