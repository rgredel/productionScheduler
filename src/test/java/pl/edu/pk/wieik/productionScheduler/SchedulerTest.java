package pl.edu.pk.wieik.productionScheduler;

import org.junit.jupiter.api.Test;
import pl.edu.pk.wieik.productionScheduler.schedule.ScheduledTaskMapper;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduleTask;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduledTask;
import pl.edu.pk.wieik.productionScheduler.schedule.Scheduler;

import java.util.List;

import static java.util.Collections.emptyList;

class SchedulerTest {
    private Scheduler scheduler = new Scheduler();
    private ScheduledTaskMapper scheduledTaskMapper = new ScheduledTaskMapper();

    @Test
    void schedule() {
        ScheduleTask task1 = ScheduleTask.builder()
                .id(0L)
                .a(2)
                .p(2)
                .d(0)
                .E(emptyList())
                .build();

        ScheduleTask task2 = ScheduleTask.builder()
                .id(1L)
                .a(1)
                .p(2)
                .d(3)
                .E(emptyList())
                .build();

        ScheduleTask task3 = ScheduleTask.builder()
                .id(2L)
                .a(3)
                .p(2)
                .d(100000)
                .E(List.of(task1, task2))
                .build();

        ScheduleTask task4 = ScheduleTask.builder()
                .id(3L)
                .a(1)
                .p(2)
                .d(100000)
                .E(List.of(task1, task2, task3))
                .build();

        ScheduleTask task5 = ScheduleTask.builder()
                .id(4L)
                .a(1)
                .p(2)
                .d(100000)
                .E(emptyList())
                .build();


        List<ScheduledTask> result = scheduler.schedule(List.of(task1, task2, task3, task4, task5));

        System.out.println(scheduledTaskMapper.mapToScheduledTasksForTimeUnit(result));

    }
}