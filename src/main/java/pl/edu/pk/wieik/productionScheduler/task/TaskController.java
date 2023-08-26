package pl.edu.pk.wieik.productionScheduler.task;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pk.wieik.productionScheduler.task.dto.CreateTaskDto;
import pl.edu.pk.wieik.productionScheduler.task.model.Task;

@RestController
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping("/task")
    public ResponseEntity<Task> createTask(@RequestBody CreateTaskDto createTaskDto){
        return ResponseEntity.ok(taskService.createTask(createTaskDto));
    }

}
