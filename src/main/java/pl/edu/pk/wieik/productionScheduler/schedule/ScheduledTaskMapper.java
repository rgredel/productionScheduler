package pl.edu.pk.wieik.productionScheduler.schedule;

import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduledTaskMapper {
    public List<ScheduledTasksForTimeUnit> mapToScheduledTasksForTimeUnit(List<ScheduledTask> tasks){
        List<ScheduledTasksForTimeUnit> result = new ArrayList<>();
        tasks.stream().map(ScheduledTask::getTimeUnit).distinct().forEach(
                timeUnit -> {
                    List<TaskOnProcessorDto> processorTask = Scheduler.getScheduledTaskForTimeUnit(tasks, timeUnit).stream()
                                    .map(scheduledTask -> TaskOnProcessorDto.builder()
                                            .id(scheduledTask.getTask().getId())
                                            .name(scheduledTask.getTask().getName())
                                            .description(scheduledTask.getTask().getDescription())
                                            .processor(scheduledTask.getProcessor())
                                            .build()).collect(Collectors.toList());
                    result.add(ScheduledTasksForTimeUnit.builder()
                            .timeUnit(timeUnit)
                            .processorTask(processorTask)
                            .build()
                    );
                }
        );
        return result;
    }

    public List<ScheduledTasksForProcessor> mapToScheduledTasksForProcessor(List<ScheduledTask> tasks){
        List<ScheduledTasksForProcessor> result = new ArrayList<>();

        tasks.stream().map(ScheduledTask::getProcessor).distinct().forEach(
                processor -> {
                    List<TaskOnTimeUnitDto> processorTasks = Scheduler.getScheduledTaskForProcessor(tasks, processor).stream()
                            .map(scheduledTask -> TaskOnTimeUnitDto.builder()
                                    .id(scheduledTask.getTask().getId())
                                    .name(scheduledTask.getTask().getName())
                                    .description(scheduledTask.getTask().getDescription())
                                    .timeUnit(scheduledTask.getTimeUnit())
                                    .build()).collect(Collectors.toList());

                    result.add(ScheduledTasksForProcessor.builder()
                            .processor(processor)
                            .tasks(processorTasks)
                            .build()
                    );
                }
        );
        return result;
    }

}
