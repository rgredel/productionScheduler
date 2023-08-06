package pl.edu.pk.wieik.productionScheduler.schedule;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ParameterDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ProductionProcessDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ProductionProcessTaskDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ParameterType;
import pl.edu.pk.wieik.productionScheduler.task.dto.TaskDto;
import pl.edu.pk.wieik.productionScheduler.user.dto.ReadUserDto;

import java.util.Collections;
import java.util.List;

@RestController
public class ScheduleController {


    @GetMapping("/")
    private String test(){
        TaskDto task1 = TaskDto.builder()
                .id(1L)
                .name("Przygotowanie materiału")
                .description("Przywiezienie materiału pod maszynę i sprawdzenie wymiarów")
                .build();

        TaskDto task2 = TaskDto.builder()
                .id(1L)
                .name("Załadowanie materiału")
                .description("Załadowanie materiału do podajnika maszyny")
                .build();

        ParameterDto numberOfProcessors = ParameterDto.builder()
                .type(ParameterType.NUMBER_OF_PROCESSORS)
                .id(1L)
                .value(2)
                .name("Number of processors")
                .build();

        ReadUserDto user1 = ReadUserDto.builder()
                .id(11L)
                .build();

        ParameterDto timeTask1 = ParameterDto.builder()
                .type(ParameterType.TIME)
                .name("Required time")
                .id(1L)
                .value(1)
                .build();

        ParameterDto materialTask1 = ParameterDto.builder()
                .type(ParameterType.REQUIRED_MATERIAL)
                .name("Required material")
                .id(1L)
                .value(1)
                .build();

        ParameterDto priorityTask1 = ParameterDto.builder()
                .type(ParameterType.PRIORITY)
                .name("Priority")
                .id(1L)
                .value(5)
                .build();

        ProductionProcessTaskDto task1ForProductionProcess = ProductionProcessTaskDto.builder()
                .task(task1)
                .user(user1)
                .parameters(List.of(timeTask1, materialTask1, priorityTask1))
                .build();

        ReadUserDto user2 = ReadUserDto.builder()
                .id(11L)
                .build();

        ParameterDto timeTask2 = ParameterDto.builder()
                .type(ParameterType.TIME)
                .name("Required time")
                .id(2L)
                .value(1)
                .build();

        ParameterDto materialTask2 = ParameterDto.builder()
                .type(ParameterType.REQUIRED_MATERIAL)
                .name("Required material")
                .id(2L)
                .value(1)
                .build();

        ParameterDto priorityTask2 = ParameterDto.builder()
                .type(ParameterType.PRIORITY)
                .name("Priority")
                .id(2L)
                .value(4)
                .build();

        ProductionProcessTaskDto task2ForProductionProcess = ProductionProcessTaskDto.builder()
                .task(task2)
                .user(user2)
                .parameters(List.of(timeTask2, materialTask2, priorityTask2))
                .build();


        ProductionProcessDto productionProcess = ProductionProcessDto.builder()
                .id(1l)
                .name("Linia produkcyjna stołu.")
                .parameters(List.of(numberOfProcessors))
                .tasks(List.of(task1ForProductionProcess, task2ForProductionProcess))
                .schedules(Collections.emptyList())
                .build();




        return productionProcess.toString();
    }

}
