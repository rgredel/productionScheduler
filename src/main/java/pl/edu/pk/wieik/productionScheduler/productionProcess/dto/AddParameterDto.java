package pl.edu.pk.wieik.productionScheduler.productionProcess.dto;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ParameterType;

@Data
@SuperBuilder
@ToString(callSuper = true)
public class AddParameterDto {
    private String name;
    private Integer value;
    private ParameterType type;
}
