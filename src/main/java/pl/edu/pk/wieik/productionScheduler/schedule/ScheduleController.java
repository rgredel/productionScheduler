package pl.edu.pk.wieik.productionScheduler.schedule;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduledTasksForTimeUnit;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping("/schedule/{id}")
    private List<ScheduledTasksForTimeUnit> scheduleProductionProcess(@PathVariable Long id){
        List<ScheduledTasksForTimeUnit> scheduledTasks = scheduleService.scheduleProductionProcess(id);
        System.out.println(scheduledTasks);
        return scheduledTasks;
    }

}
