package pl.edu.pk.wieik.productionScheduler.schedule;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.exception.ImpossibleToScheduleException;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduleTask;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduledTask;

import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.util.CollectionUtils.isEmpty;

@RequiredArgsConstructor
@Service
public class Scheduler {
    public List<ScheduledTask> schedule(List<ScheduleTask> allTasks, int availableProcessors){
        List<ScheduleTask> scheduledTasks = new ArrayList<>();
        List<ScheduledTask> schedule = new LinkedList<>();

        List<ScheduleTask> dependentTasks = new ArrayList<>();
        int currentTimeUnit = 0;

        for (ScheduleTask task : allTasks) {
            calculatePriority(task);
            calculateCriticalTaskTime(task, dependentTasks);
            calculateNumberOfDependencies(task);
        }

        if(!isEmpty(dependentTasks)){
            for (ScheduleTask task : allTasks) {
                recalculatePriorityForDependentTasks(task);
            }
        }

        for (ScheduleTask task : allTasks) {
            validatePossibilityToSchedule(task);
        }

        List<ScheduleTask> copyOfTasks = new ArrayList<>(allTasks);

        for (ScheduleTask task : copyOfTasks) {
            copyTaskTimeToQ(task);
        }

        while (!isEmpty(copyOfTasks)){
            int currentlyAvailableProcessors = availableProcessors;
            List<ScheduleTask> readyTasks = getReadyTasks(copyOfTasks, scheduledTasks);
            int timeUnits = 1;
            while (!isEmpty(readyTasks) && currentlyAvailableProcessors > 0) {
                recalculateReadyTask(readyTasks, currentlyAvailableProcessors);
                ScheduleTaskResult scheduleTaskResult = scheduleReadyTask(readyTasks, currentlyAvailableProcessors, availableProcessors, timeUnits, schedule, currentTimeUnit);
                currentlyAvailableProcessors = scheduleTaskResult.getAvailableProcessors();
                ScheduleTask processedTask = scheduleTaskResult.getProcessedTask();
                if(processedTask.getQ() == 0){
                    copyOfTasks.remove(processedTask);
                    scheduledTasks.add(processedTask);
                }
            }
            currentTimeUnit += timeUnits;
        }

        return schedule;
    }

    private ScheduleTaskResult scheduleReadyTask(List<ScheduleTask> readyTasks, int availableProcessors, int allProcessors, int timeUnits, List<ScheduledTask> schedule, int currentTimeUnit) {

        int maxPriority = maxPriority(readyTasks);
        List<ScheduleTask> tasksWithMaxPriority = findAllTasksWithGivenPriority(readyTasks, maxPriority);

        int maxRequiredProcessors = maxRequiredProcessors(tasksWithMaxPriority);
        List<ScheduleTask> tasksWithMaxRequiredProcessors = findAllTasksWithGivenRequiredProcessors(tasksWithMaxPriority, maxRequiredProcessors);

        int maxNumberOfDependencies = maxNumberOfDependencies(tasksWithMaxRequiredProcessors);
        List<ScheduleTask> tasksWithMaxNumberOfDependencies = findAllTasksWithGivenNumberOfDependencies(tasksWithMaxRequiredProcessors, maxNumberOfDependencies);
        ScheduleTask currentTask = ScheduleTask.builder().build();
        if(!isEmpty(tasksWithMaxNumberOfDependencies)) {
            currentTask = tasksWithMaxNumberOfDependencies.get(0);
            if(maxRequiredProcessors <= availableProcessors){
                scheduleTaskForOneTimeUnit(currentTask, schedule, allProcessors, currentTimeUnit);

                availableProcessors = availableProcessors - maxRequiredProcessors;
                
                int currentTaskTime = currentTask.getQ();

                currentTask.setQ(currentTaskTime - timeUnits);

                readyTasks.remove(currentTask);
            } else {
                readyTasks.remove(currentTask);
            }
        }

        return new ScheduleTaskResult(availableProcessors, currentTask);
    }

    private void calculatePriority(ScheduleTask task){
        task.setW(task.getA()*task.getP());
    }

    private void calculateCriticalTaskTime(ScheduleTask task, List<ScheduleTask> dependentTasks) {
        List<ScheduleTask> previousTasks = task.getE();
        if (!previousTasks.isEmpty()){
            dependentTasks.add(task);
        }

        Integer criticalTaskTime = previousTasks.stream().map(ScheduleTask::getP).reduce(0, Integer::sum);
        task.setT(criticalTaskTime);
    }
    private void calculateNumberOfDependencies(ScheduleTask task) {
        List<ScheduleTask> previousTasks = task.getE();

        if(isEmpty(previousTasks)){
            task.setH(0);
        }else {
            task.setH(previousTasks.size());
        }
    }

    private void recalculatePriorityForDependentTasks(ScheduleTask task) {
        int currentPriority = task.getW();
        int criticalTaskTime = task.getT();
        task.setW(currentPriority + criticalTaskTime);
    }

    private void validatePossibilityToSchedule(ScheduleTask task) {
        int latestTaskCompletionDate = task.getD() + task.getP();
        if(task.getT() > latestTaskCompletionDate){
            throw new ImpossibleToScheduleException("Latest task completion date is before critical task date" +  task);
        }
    }

    private void copyTaskTimeToQ(ScheduleTask task) {
        task.setQ(task.getP());
    }

    private List<ScheduleTask> getReadyTasks(List<ScheduleTask> tasks, List<ScheduleTask> scheduledTasks) {
        return tasks.stream()
                .filter(task -> scheduledTasks.containsAll(task.getE()))
                .collect(Collectors.toList());
    }

    private int maxPriority(List<ScheduleTask> tasks) {
        List<Integer> allPriorities = tasks.stream().map(ScheduleTask::getW).distinct().toList();
        return Collections.max(allPriorities);
    }

    private List<ScheduleTask> findAllTasksWithGivenPriority(List<ScheduleTask> tasks, int priority) {
        return tasks.stream().filter(task -> task.getW() == priority).collect(Collectors.toList());
    }

    private int maxRequiredProcessors(List<ScheduleTask> tasks) {
        List<Integer> allRequiredProcessors = tasks.stream().map(ScheduleTask::getA).distinct().toList();
        return Collections.max(allRequiredProcessors);
    }

    private List<ScheduleTask> findAllTasksWithGivenRequiredProcessors(List<ScheduleTask> tasks, int requiredProcessors) {
        return tasks.stream().filter(task -> task.getA() == requiredProcessors).collect(Collectors.toList());
    }

    private int maxNumberOfDependencies(List<ScheduleTask> tasks) {
        List<Integer> allH = tasks.stream().map(ScheduleTask::getH).distinct().collect(Collectors.toList());
        if(isEmpty(allH)){
            return 0;
        }
        return Collections.max(allH);
    }

    private List<ScheduleTask> findAllTasksWithGivenNumberOfDependencies(List<ScheduleTask> tasks, int h) {
        return tasks.stream().filter(task -> task.getH() == h).collect(Collectors.toList());
    }

    private void scheduleTaskForOneTimeUnit(ScheduleTask task, List<ScheduledTask> schedule, int allProcessors, int currentTimeUnit) {

        int requiredProcessors = task.getA();
        for (int i = 0; i < requiredProcessors; i++){
            ScheduledTask scheduledTask = ScheduledTask.builder()
                    .timeUnit(currentTimeUnit)
                    .task(task)
                    .processor(findBestAvailableProcessor(task, schedule, allProcessors, currentTimeUnit))
                    .build();

            schedule.add(scheduledTask);
        }
    }

    private int findBestAvailableProcessor(ScheduleTask task, List<ScheduledTask> schedule, int allProcessors, int currentTimeUnit){
        List<ScheduledTask> scheduledTaskForCurrentTimeUnit = getScheduledTaskForTimeUnit(schedule, currentTimeUnit);
        List<Integer> unavailableProcessors = scheduledTaskForCurrentTimeUnit.stream()
                .map(ScheduledTask::getProcessor)
                .toList();

        List<Integer> availableProcessors = new ArrayList<>();
        for (int i = 0; i < allProcessors; i++){
            if(!unavailableProcessors.contains(i)){
                availableProcessors.add(i);
            }
        }

        List<Integer> processorsWithSameTaskAtPreviousTimeUnit = getScheduledTaskForTimeUnit(schedule, currentTimeUnit-1).stream()
                .filter(scheduledTask -> scheduledTask.getTask().equals(task))
                .map(ScheduledTask::getProcessor)
                .toList();

        for (Integer processor : availableProcessors){
            if(processorsWithSameTaskAtPreviousTimeUnit.contains(processor)){
                return processor;
            }
        }

        return availableProcessors.stream().findFirst().get();
    }

    public static List<ScheduledTask> getScheduledTaskForTimeUnit(List<ScheduledTask> schedule, int timeUnit){
        return schedule.stream()
                .filter(scheduledTask -> scheduledTask.getTimeUnit() == timeUnit).
                collect(Collectors.toList());
    }
    private void recalculateReadyTask(List<ScheduleTask> readyTasks, int currentlyAvailableProcessors) {
        readyTasks.removeIf(task -> task.getA() > currentlyAvailableProcessors);
    }

    @Getter
    @Setter
    private static class ScheduleTaskResult {
        private int availableProcessors;
        private ScheduleTask processedTask;

        public ScheduleTaskResult(int availableProcessors, ScheduleTask processedTask) {
            this.availableProcessors = availableProcessors;
            this.processedTask = processedTask;
        }
    }
}
