package pl.edu.pk.wieik.productionScheduler.schedule;

import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduledTask;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduledTasksForTimeUnit;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.SimpleTaskDto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduledTaskMapper {
    public List<ScheduledTasksForTimeUnit> mapToScheduledTasksForTimeUnit(List<ScheduledTask> tasks){
        List<ScheduledTasksForTimeUnit> result = new ArrayList<>();
        tasks.stream().map(ScheduledTask::getTimeUnit).distinct().forEach(
                timeUnit -> {
                    List<SimpleTaskDto> processorTaskId = Scheduler.getScheduledTaskForTimeUnit(tasks, timeUnit).stream()
                                    .map(scheduledTask -> SimpleTaskDto.builder().taskId(scheduledTask.getTask().getId()).processor(scheduledTask.getProcessor()).build()).collect(Collectors.toList());
                    result.add(ScheduledTasksForTimeUnit.builder()
                            .timeUnit(timeUnit)
                            .processorTaskId(processorTaskId)
                            .build()
                    );
                }
        );
        return result;
    }


}
