package pl.edu.pk.wieik.productionScheduler.productionProcess;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ProductionProcessTaskDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ParameterType;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduleTask;
import pl.edu.pk.wieik.productionScheduler.parameter.ParameterService;

@Service
@RequiredArgsConstructor
public class ProductionProcessMapper {
    private final ParameterService parameterService;

    public ScheduleTask mapToElement(ProductionProcessTaskDto task){
        var parameters = task.getParameters();

        return ScheduleTask.builder()
                .p((int)parameterService.getValueByType(parameters, ParameterType.TIME))
                .build();
    }
}
