package pl.edu.pk.wieik.productionScheduler.schedule;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.parameter.ParameterService;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Type;
import pl.edu.pk.wieik.productionScheduler.productionProcess.ProductionProcessService;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.*;
import pl.edu.pk.wieik.productionScheduler.productionProcess.mapper.ProductionProcessMapper;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduleTask;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduledTask;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduledTasksForTimeUnit;

import java.util.List;
import java.util.logging.Logger;

import static org.springframework.util.CollectionUtils.isEmpty;


@Service
@RequiredArgsConstructor
public class ScheduleService {
    private static final Logger LOGGER = Logger.getLogger(ScheduleService.class.getName());
    private final ProductionProcessService productionProcessService;
    private final ParameterService parameterService;
    private final ProductionProcessMapper productionProcessMapper;
    private final Scheduler scheduler;
    private final ScheduledTaskMapper scheduledTaskMapper;

    public List<ScheduledTasksForTimeUnit> scheduleProductionProcess(Long id) {
        ProductionProcessDto productionProcessDto = productionProcessService.getProductionProcessDtoById(id);

        List<ProductionProcessParameterDto> parameters = productionProcessDto.getParameters();
        List<ProductionProcessTaskDto> tasks = productionProcessDto.getTasks();

        int availableProcessors = parameterService.getValueByType(parameters, Type.AVAILABLE_PROCESSORS);
        List<ScheduleTask> scheduleTasks = productionProcessMapper.mapToScheduleTasks(tasks);
        List<ScheduledTask> schedule = scheduler.schedule(scheduleTasks, availableProcessors);
        return scheduledTaskMapper.mapToScheduledTasksForTimeUnit(schedule);
    }


}
