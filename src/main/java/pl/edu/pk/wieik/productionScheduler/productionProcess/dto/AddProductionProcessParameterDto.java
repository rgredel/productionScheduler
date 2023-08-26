package pl.edu.pk.wieik.productionScheduler.productionProcess.dto;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;


@Data
@SuperBuilder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class AddProductionProcessParameterDto extends ParameterDto {
    private String name;
}
