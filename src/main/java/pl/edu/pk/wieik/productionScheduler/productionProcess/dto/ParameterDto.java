package pl.edu.pk.wieik.productionScheduler.productionProcess.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Type;

@Getter
@Setter
@SuperBuilder
@RequiredArgsConstructor
public class ParameterDto {
    private Long id;
    private String name;
    private int value;
    private Type type;
}
