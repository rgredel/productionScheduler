package pl.edu.pk.wieik.productionScheduler.productionProcess.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Type;

@Getter
@Setter
@SuperBuilder
public abstract class ParameterDto {
    protected int value;
    protected Type type;
}
