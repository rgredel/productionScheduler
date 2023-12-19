package pl.edu.pk.wieik.productionScheduler.productionProcess.dto;

import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
public class CreateProductionProcessDto {
    private String name;
    private Integer availableProcessors;
}
