package pl.edu.pk.wieik.productionScheduler.schedule;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduleWrapper;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduledTasksForProcessor;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduledTasksForTimeUnit;

@RestController
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping("/schedule/{id}")
    private ScheduleWrapper<ScheduledTasksForTimeUnit> scheduleProductionProcess(@PathVariable Long id){
        return scheduleService.scheduledTasksForTimeUnits(id);
    }

    @GetMapping("/schedule/{id}/processor")
    private ScheduleWrapper<ScheduledTasksForProcessor> scheduleProductionProcessForProcessor(@PathVariable Long id){
        return scheduleService.scheduledTasksForProcessor(id);
    }

}
