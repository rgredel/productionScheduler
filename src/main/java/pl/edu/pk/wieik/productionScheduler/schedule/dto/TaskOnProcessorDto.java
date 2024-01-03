package pl.edu.pk.wieik.productionScheduler.schedule.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class TaskOnProcessorDto {
    private Long id;
    private String name;
    private String description;
    private int processor;
}
