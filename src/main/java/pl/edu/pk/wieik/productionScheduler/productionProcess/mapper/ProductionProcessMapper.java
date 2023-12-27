package pl.edu.pk.wieik.productionScheduler.productionProcess.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.parameter.ParameterService;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Parameter;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Type;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.*;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ProductionProcess;
import pl.edu.pk.wieik.productionScheduler.schedule.dto.ScheduleTask;
import pl.edu.pk.wieik.productionScheduler.task.dto.TaskDto;
import pl.edu.pk.wieik.productionScheduler.task.model.ProductionProcessTask;
import pl.edu.pk.wieik.productionScheduler.task.model.Task;
import pl.edu.pk.wieik.productionScheduler.user.model.User;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductionProcessMapper {
    private final ParameterService parameterService;

    public ProductionProcessTaskDto mapToProductionProcessTaskDto(ProductionProcessTask task){
        return ProductionProcessTaskDto.builder()
                .id(task.getId())
                .task(mapToTaskDto(task.getTask()))
                .previousTaskIds(task.getPreviousProductionProcessTasks().stream().map(ProductionProcessTask::getId).collect(Collectors.toList()))
                .nextTaskIds(task.getNextProductionProcessTasks().stream().map(ProductionProcessTask::getId).collect(Collectors.toList()))
                .parameters(mapToTaskParameterDtos(task.getParameters()))
                .build();
    }

    public List<ProductionProcessTaskDto> mapToProductionProcessTaskDtos(List<ProductionProcessTask> tasks){
        return tasks.stream().map(this::mapToProductionProcessTaskDto).collect(Collectors.toList());
    }

    public TaskDto mapToTaskDto(Task task){
        return TaskDto.builder()
                .id(task.getId())
                .name(task.getName())
                .description(task.getDescription())
                .build();
    }

    public List<ParameterDto> mapToTaskParameterDtos(List<Parameter> parameters){
        return parameters.stream().map(this::mapToTaskParameterDto).collect(Collectors.toList());
    }

    public ParameterDto mapToTaskParameterDto(Parameter parameter){
        return ParameterDto.builder()
                .id(parameter.getId())
                .value(parameter.getValue())
                .type(parameter.getType())
                .name(parameter.getName())
                .build();
    }

    public List<ProductionProcessParameterDto> mapToProductionProcessParameterDtos(List<Parameter> parameters){
        return parameters.stream().map(this::mapToProductionProcessParameterDto).collect(Collectors.toList());
    }

    public ProductionProcessParameterDto mapToProductionProcessParameterDto(Parameter parameter){
        return ProductionProcessParameterDto.builder()
                .id(parameter.getId())
                .value(parameter.getValue())
                .type(parameter.getType())
                .name(parameter.getName())
                .build();
    }

    public List<ProductionProcessDto> mapToProductionProcessDtos(List<ProductionProcess> productionProcesses){
        return productionProcesses.stream().map(this::mapToProductionProcessDto).collect(Collectors.toList());
    }

    public ProductionProcessDto mapToProductionProcessDto(ProductionProcess productionProcess){
        return ProductionProcessDto.builder()
                .id(productionProcess.getId())
                .name(productionProcess.getName())
                .userId(Optional.ofNullable(productionProcess.getUser()).orElse(new User()).getId())
                .parameters(mapToProductionProcessParameterDtos(productionProcess.getParameters()))
                .tasks(mapToProductionProcessTaskDtos(productionProcess.getProductionProcessTasks()))
                .build();
    }

    public List<ScheduleTask> mapToScheduleTasks(List<ProductionProcessTaskDto> tasks) {
        List<ScheduleTask> scheduleTasks = tasks.stream().map(this::mapToScheduleTask).collect(Collectors.toList());
        fillDependencies(scheduleTasks);
        return scheduleTasks;
    }

    private ScheduleTask mapToScheduleTask(ProductionProcessTaskDto task){
        List<ParameterDto> parameters = task.getParameters();

        return ScheduleTask.builder()
                .id(task.getId())
                .name(task.getTask().getName())
                .a(parameterService.getValueByType(parameters, Type.REQUIRED_PROCESSORS))
                .p(parameterService.getValueByType(parameters, Type.TIME))
                .d(parameterService.getValueByType(parameters, Type.LATEST_POSSIBLE_START_TIME))
                .E(task.getPreviousTaskIds().stream().map(id -> ScheduleTask.builder().id(id).build()).collect(Collectors.toList()))
                .build();
    }

    private void fillDependencies(List<ScheduleTask> scheduleTasks) {
        scheduleTasks.forEach( task -> fillDependencies(task, scheduleTasks));
    }

    private void fillDependencies(ScheduleTask task, List<ScheduleTask> scheduleTasks) {
        List<ScheduleTask> previousTasks = task.getE();
        List<Long> previousTaskIds = previousTasks.stream().map(ScheduleTask::getId).toList();
        List<ScheduleTask> filledDependencies = scheduleTasks.stream().filter(t -> previousTaskIds.contains(t.getId())).collect(Collectors.toList());
        task.setE(filledDependencies);
    }
}
