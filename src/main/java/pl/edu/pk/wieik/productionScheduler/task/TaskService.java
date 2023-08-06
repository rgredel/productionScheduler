package pl.edu.pk.wieik.productionScheduler.task;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.task.dto.CreateTaskDto;
import pl.edu.pk.wieik.productionScheduler.task.model.Task;
import pl.edu.pk.wieik.productionScheduler.task.repository.TaskRepository;

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
}
