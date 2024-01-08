package pl.edu.pk.wieik.productionScheduler.schedule;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.parameter.ParameterService;
import pl.edu.pk.wieik.productionScheduler.parameter.dto.ProductionProcessParameterDto;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Type;
import pl.edu.pk.wieik.productionScheduler.productionProcess.ProductionProcessService;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.*;
import pl.edu.pk.wieik.productionScheduler.productionProcess.mapper.ProductionProcessMapper;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.*;

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

    public List<ScheduledTask> scheduleProductionProcess(ProductionProcessDto productionProcessDto) {
        List<ProductionProcessParameterDto> parameters = productionProcessDto.getParameters();
        List<ProductionProcessTaskDto> tasks = productionProcessDto.getTasks();
        int availableProcessors = parameterService.getValueByType(parameters, Type.AVAILABLE_PROCESSORS);
        List<ScheduleTask> scheduleTasks = productionProcessMapper.mapToScheduleTasks(tasks);
        return scheduler.schedule(scheduleTasks, availableProcessors);
    }

    public ScheduleWrapper<ScheduledTasksForTimeUnit> scheduledTasksForTimeUnits(Long id) {
        ProductionProcessDto productionProcessDto = productionProcessService.getProductionProcessDtoById(id);
        List<ScheduledTask> scheduledTasks = scheduleProductionProcess(productionProcessDto);
        List<ScheduledTasksForTimeUnit> scheduledTasksForTimeUnits = scheduledTaskMapper.mapToScheduledTasksForTimeUnit(scheduledTasks);
        return ScheduleWrapper
                .<ScheduledTasksForTimeUnit>builder()
                .processId(productionProcessDto.getId())
                .processName(productionProcessDto.getName())
                .scheduleData(scheduledTasksForTimeUnits)
                .build();
    }

    public ScheduleWrapper<ScheduledTasksForProcessor> scheduledTasksForProcessor(Long id) {
        ProductionProcessDto productionProcessDto = productionProcessService.getProductionProcessDtoById(id);
        List<ScheduledTask> scheduledTasks = scheduleProductionProcess(productionProcessDto);
        List<ScheduledTasksForProcessor> scheduledTasksForProcessors = scheduledTaskMapper.mapToScheduledTasksForProcessor(scheduledTasks);
        return ScheduleWrapper
                .<ScheduledTasksForProcessor>builder()
                .processId(productionProcessDto.getId())
                .processName(productionProcessDto.getName())
                .scheduleData(scheduledTasksForProcessors)
                .build();
    }

}
