package pl.edu.pk.wieik.productionScheduler.parameter.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class ProductionProcessParameterDto extends AddProductionProcessParameterDto{
    private Long id;
}
