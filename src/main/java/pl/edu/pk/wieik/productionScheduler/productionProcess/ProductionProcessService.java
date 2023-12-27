package pl.edu.pk.wieik.productionScheduler.productionProcess;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.exception.NotFoundException;
import pl.edu.pk.wieik.productionScheduler.parameter.ParameterService;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Parameter;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Type;
import pl.edu.pk.wieik.productionScheduler.parameter.repository.ParameterRepository;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.AddProductionProcessParameterDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.CreateProductionProcessDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ProductionProcessDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ProductionProcessTaskDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.mapper.ProductionProcessMapper;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ProductionProcess;
import pl.edu.pk.wieik.productionScheduler.productionProcess.repository.ProductionProcessRepository;
import pl.edu.pk.wieik.productionScheduler.productionProcess.task.AddProductionProcessTaskDto;
import pl.edu.pk.wieik.productionScheduler.task.TaskService;
import pl.edu.pk.wieik.productionScheduler.task.dto.CreateTaskDto;
import pl.edu.pk.wieik.productionScheduler.task.model.ProductionProcessTask;
import pl.edu.pk.wieik.productionScheduler.task.model.Task;
import pl.edu.pk.wieik.productionScheduler.task.repository.ProductionProcessTaskRepository;
import pl.edu.pk.wieik.productionScheduler.user.UserService;
import pl.edu.pk.wieik.productionScheduler.user.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import static java.util.Objects.isNull;
import static org.springframework.util.CollectionUtils.isEmpty;


@Service
@RequiredArgsConstructor
public class ProductionProcessService {
    private static final Logger LOGGER = Logger.getLogger(ProductionProcessService.class.getName());
    private final TaskService taskService;
    private final ProductionProcessTaskRepository productionProcessTaskRepository;
    private final ProductionProcessRepository productionProcessRepository;
    private final UserService userService;
    private final ParameterService parameterService;
    private final ProductionProcessMapper productionProcessMapper;
    private final ParameterRepository parameterRepository;

    public ProductionProcessTaskDto addProductionProcessTask(Long id, AddProductionProcessTaskDto addProductionProcessTaskDto){
        ProductionProcess productionProcess = getProductionProcessById(id);

        CreateTaskDto taskDto = CreateTaskDto.builder()
                .name(addProductionProcessTaskDto.getName())
                .description(addProductionProcessTaskDto.getDescription())
                .build();
        Task task = taskService.createTask(taskDto);

        List<Long> previousTaskIds = addProductionProcessTaskDto.getPreviousTaskIds();
        List<ProductionProcessTask> previousTasks = new ArrayList<>();
        if(!isEmpty(previousTaskIds)) {
            previousTasks = productionProcessTaskRepository.findAllById(previousTaskIds);
        }

        //Users user = usersService.getUserById(addProductionProcessTaskDto.getUserId());


        ProductionProcessTask productionProcessTask = ProductionProcessTask.builder()
                .productionProcess(productionProcess)
                .task(task)
                .previousProductionProcessTasks(previousTasks)
                //.user(user)
                .build();

        ProductionProcessTask savedProductionProcessTask = productionProcessTaskRepository.save(productionProcessTask);
        List<Parameter> parameters = parameterService.addAllTaskParametersToProductionProcessTask(addProductionProcessTaskDto.getParameters(), savedProductionProcessTask);
        savedProductionProcessTask.setParameters(parameters);
        return productionProcessMapper.mapToProductionProcessTaskDto(savedProductionProcessTask);
    }

    public ProductionProcessTaskDto updateProductionProcessTask(Long productionProcessId, Long taskId, AddProductionProcessTaskDto addProductionProcessTaskDto) {
        ProductionProcess productionProcess = getProductionProcessById(productionProcessId);
        ProductionProcessTask productionProcessTaskToUpdate = getProductionProcessTaskById(taskId);
        Task task = productionProcessTaskToUpdate.getTask();

        task.setName(addProductionProcessTaskDto.getName());
        task.setDescription(addProductionProcessTaskDto.getDescription());
        productionProcessTaskToUpdate.setTask(task);

        //taskService.updateTask(task);
        List<Long> previousTaskIds = addProductionProcessTaskDto.getPreviousTaskIds();
        List<ProductionProcessTask> previousTasks = new ArrayList<>();
        if(!isEmpty(previousTaskIds)) {
            previousTasks = productionProcessTaskRepository.findAllById(previousTaskIds);
        }
        productionProcessTaskToUpdate.setPreviousProductionProcessTasks(previousTasks);

        //Users user = usersService.getUserById(addProductionProcessTaskDto.getUserId());

        productionProcessTaskToUpdate.getParameters().clear();

        productionProcessTaskToUpdate.setProductionProcess(productionProcess);
        ProductionProcessTask savedProductionProcessTask = productionProcessTaskRepository.save(productionProcessTaskToUpdate);

        var updateParameters = addProductionProcessTaskDto.getParameters();
        List<Parameter> parameters = parameterService.addAllTaskParametersToProductionProcessTask(updateParameters, productionProcessTaskToUpdate);

        savedProductionProcessTask.setParameters(parameters);
        return productionProcessMapper.mapToProductionProcessTaskDto(savedProductionProcessTask);

    }

    public List<ProductionProcessTaskDto> getAllProductionProcessTasks(Long id){
        ProductionProcess productionProcess = getProductionProcessById(id);
        return productionProcessMapper.mapToProductionProcessTaskDtos(productionProcess.getProductionProcessTasks());
    }

    public ProductionProcess createProductionProcess(CreateProductionProcessDto createProductionProcessDto, User user){
        if(isNull(user)){
            throw new NotFoundException("User not found!");
        }

        ProductionProcess productionProcess = ProductionProcess.builder()
                .name(createProductionProcessDto.getName())
                .user(user)
                .build();

        ProductionProcess savedProdProcess = productionProcessRepository.save(productionProcess);
        AddProductionProcessParameterDto availableProcessorsParam = availableProcessorsAddDto(createProductionProcessDto.getAvailableProcessors());
        parameterService.addParameterToProductionProcess(availableProcessorsParam, savedProdProcess);
        return savedProdProcess;
    }

    public ProductionProcess updateProductionProcess(Long productionProcessId, CreateProductionProcessDto createProductionProcessDto){
        ProductionProcess productionProcess = productionProcessRepository.findById(productionProcessId)
                .orElseThrow(() -> new NotFoundException(String.format("Production process with id: %s doesn't exists", productionProcessId)));

        AddProductionProcessParameterDto availableProcessorsParam = availableProcessorsAddDto(createProductionProcessDto.getAvailableProcessors());
        productionProcess.setName(createProductionProcessDto.getName());

        Optional<Parameter> availableProcessors = productionProcess.getParameters().stream().filter(p -> p.getType().equals(Type.AVAILABLE_PROCESSORS)).findFirst();

        ProductionProcess savedProdProcess = productionProcessRepository.save(productionProcess);

        if(availableProcessors.isPresent()){
            Parameter parameter = availableProcessors.get();
            parameter.setValue(createProductionProcessDto.getAvailableProcessors());
            parameterRepository.save(parameter);
        } else {
            parameterService.addParameterToProductionProcess(availableProcessorsParam, savedProdProcess);
        }

        return savedProdProcess;
    }

    private static AddProductionProcessParameterDto availableProcessorsAddDto(Integer processors) {
        return AddProductionProcessParameterDto.builder()
                .name("Available processors")
                .value(processors)
                .type(Type.AVAILABLE_PROCESSORS)
                .build();
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
        if(productionProcessTask != null) {
            productionProcessTaskRepository.deletePreviousTasks(productionProcessTask.getId());
            productionProcessTaskRepository.delete(productionProcessTask);
        }
        return null;
    }

    public List<ProductionProcessDto> getAllUsersProductionProcesses(Long userId) {
        return productionProcessMapper.mapToProductionProcessDtos(productionProcessRepository.findByUserId(userId));
    }

    public Void removeProductionProcess(Long id) {
        ProductionProcess productionProcess = getProductionProcessById(id);
        productionProcessRepository.delete(productionProcess);
        return null;
    }
}
