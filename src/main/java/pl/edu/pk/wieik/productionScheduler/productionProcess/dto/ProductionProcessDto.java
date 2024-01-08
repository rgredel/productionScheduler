package pl.edu.pk.wieik.productionScheduler.productionProcess.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import pl.edu.pk.wieik.productionScheduler.parameter.dto.ProductionProcessParameterDto;

import java.util.List;

@Data
@Builder
@ToString
public class ProductionProcessDto {
    private Long id;
    private String name;
    private Long userId;
    private List<ProductionProcessParameterDto> parameters;
    private List<ProductionProcessTaskDto> tasks;
}
