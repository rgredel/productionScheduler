package pl.edu.pk.wieik.productionScheduler.task;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.exception.NotFoundException;
import pl.edu.pk.wieik.productionScheduler.task.dto.CreateTaskDto;
import pl.edu.pk.wieik.productionScheduler.task.model.Task;
import pl.edu.pk.wieik.productionScheduler.task.repository.TaskRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    public Task createTask(CreateTaskDto createTaskDto){

        Task task = Task.builder()
                .name(createTaskDto.getName())
                .description(createTaskDto.getDescription())
                .build();

        return taskRepository.save(task);
    }

    public Task getTaskById(Long taskId){
        Optional<Task> task = taskRepository.findById(taskId);
        if(task.isPresent()){
            return task.get();
        }
        throw new NotFoundException(String.format("Task with id %s doesnt exist", taskId));
    }

}
