package pl.edu.pk.wieik.productionScheduler.productionProcess;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.exception.NotFoundException;
import pl.edu.pk.wieik.productionScheduler.parameter.ParameterService;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Parameter;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.AddProductionProcessParameterDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.CreateProductionProcessDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ProductionProcessDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ProductionProcessTaskDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.mapper.ProductionProcessMapper;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ProductionProcess;
import pl.edu.pk.wieik.productionScheduler.productionProcess.repository.ProductionProcessRepository;
import pl.edu.pk.wieik.productionScheduler.productionProcess.task.AddProductionProcessTaskDto;
import pl.edu.pk.wieik.productionScheduler.task.TaskService;
import pl.edu.pk.wieik.productionScheduler.task.model.ProductionProcessTask;
import pl.edu.pk.wieik.productionScheduler.task.model.Task;
import pl.edu.pk.wieik.productionScheduler.task.repository.ProductionProcessTaskRepository;
import pl.edu.pk.wieik.productionScheduler.user.UsersService;
import pl.edu.pk.wieik.productionScheduler.user.model.Users;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import static org.springframework.util.CollectionUtils.isEmpty;


@Service
@RequiredArgsConstructor
public class ProductionProcessService {
    private static final Logger LOGGER = Logger.getLogger(ProductionProcessService.class.getName());
    private final TaskService taskService;
    private final ProductionProcessTaskRepository productionProcessTaskRepository;
    private final ProductionProcessRepository productionProcessRepository;
    private final UsersService usersService;
    private final ParameterService parameterService;
    private final ProductionProcessMapper productionProcessMapper;

    public ProductionProcessTaskDto addProductionProcessTask(Long id, AddProductionProcessTaskDto addProductionProcessTaskDto){
        ProductionProcess productionProcess = getProductionProcessById(id);
        Task task = taskService.getTaskById(addProductionProcessTaskDto.getTaskId());

        List<Long> previousTaskIds = addProductionProcessTaskDto.getPreviousTaskIds();
        List<ProductionProcessTask> previousTasks = new ArrayList<>();
        if(!isEmpty(previousTaskIds)) {
            previousTasks = productionProcessTaskRepository.findAllById(previousTaskIds);
        }

        Users user = usersService.getUserById(addProductionProcessTaskDto.getUserId());


        ProductionProcessTask productionProcessTask = ProductionProcessTask.builder()
                .productionProcess(productionProcess)
                .task(task)
                .previousProductionProcessTasks(previousTasks)
                .user(user)
                .build();

        ProductionProcessTask savedProductionProcessTask = productionProcessTaskRepository.save(productionProcessTask);
        List<Parameter> parameters = parameterService.addAllTaskParametersToProductionProcessTask(addProductionProcessTaskDto.getParameters(), savedProductionProcessTask);
        savedProductionProcessTask.setParameters(parameters);
        return productionProcessMapper.mapToProductionProcessTaskDto(savedProductionProcessTask);
    }

    public List<ProductionProcessTaskDto> getAllProductionProcessTasks(Long id){
        ProductionProcess productionProcess = getProductionProcessById(id);
        return productionProcessMapper.mapToProductionProcessTaskDtos(productionProcess.getProductionProcessTasks());
    }

    public ProductionProcess createProductionProcess(CreateProductionProcessDto createProductionProcessDto){
        ProductionProcess productionProcess = ProductionProcess.builder()
                .name(createProductionProcessDto.getName())
                .build();

        return productionProcessRepository.save(productionProcess);
    }

    public Void removeParameterFromProductionProcess(Long parameterId){
        parameterService.removeParameterById(parameterId);
        return null;
    }

    public ProductionProcess getProductionProcessById(Long productionProcessId) {
        Optional<ProductionProcess> productionProcess = productionProcessRepository.findById(productionProcessId);
        if(productionProcess.isPresent()){
            return productionProcess.get();
        }

        throw new NotFoundException(String.format("Production process with id %s doesnt exist", productionProcessId));
    }

    public ProductionProcessDto getProductionProcessDtoById(Long productionProcessId) {
        return productionProcessMapper.mapToProductionProcessDto(getProductionProcessById(productionProcessId));
    }

    public ProductionProcessTask getProductionProcessTaskById(Long productionProcessTaskId) {
        Optional<ProductionProcessTask> productionProcessTask = productionProcessTaskRepository.findById(productionProcessTaskId);
        if(productionProcessTask.isPresent()){
            return productionProcessTask.get();
        }

        throw new NotFoundException(String.format("Production process task with id %s doesnt exist", productionProcessTaskId));
    }

    public Parameter addProductionProcessParameter(Long productionProcessId, AddProductionProcessParameterDto addProductionProcessParameterDto) {
        ProductionProcess productionProcess = getProductionProcessById(productionProcessId);
        return parameterService.addParameterToProductionProcess(addProductionProcessParameterDto, productionProcess);
    }

    public Void removeProductionProcessTask(Long id) {
        ProductionProcessTask productionProcessTask = getProductionProcessTaskById(id);
        productionProcessTaskRepository.delete(productionProcessTask);
        return null;
    }

    public List<ProductionProcessDto> getAllProductionProcesses() {
        return productionProcessMapper.mapToProductionProcessDtos(productionProcessRepository.findAll());
    }
}
