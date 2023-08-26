package pl.edu.pk.wieik.productionScheduler.parameter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.exception.NotFoundException;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Parameter;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Type;
import pl.edu.pk.wieik.productionScheduler.parameter.repository.ParameterRepository;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.AddProductionProcessParameterDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.AddTaskParameterDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ParameterDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ProductionProcess;
import pl.edu.pk.wieik.productionScheduler.task.model.ProductionProcessTask;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ParameterService {
    private final ParameterRepository parameterRepository;
    public int getValueByType(List<? extends ParameterDto> parameters, Type type){
        Optional<? extends ParameterDto> parameter = parameters.stream().filter(p -> p.getType() == type).findFirst();

        return parameter.map(ParameterDto::getValue).orElse(0);
    }

    public Parameter addTaskParameterToProductionProcessTask(AddTaskParameterDto addParameterDto, ProductionProcessTask productionProcessTask){
        Parameter parameter = Parameter.builder()
                .productionProcessTask(productionProcessTask)
                .name(addParameterDto.getName())
                .value(addParameterDto.getValue())
                .type(addParameterDto.getType())
                .build();

        return parameterRepository.save(parameter);
    }

    public List<Parameter> addAllTaskParametersToProductionProcessTask(List<AddTaskParameterDto> addParameterDtos, ProductionProcessTask productionProcessTask){
       return addParameterDtos.stream()
               .map(dto -> addTaskParameterToProductionProcessTask(dto, productionProcessTask))
               .filter(Objects::nonNull)
               .collect(Collectors.toList());
    }

    public Parameter addParameterToProductionProcess(AddProductionProcessParameterDto parameterDto, ProductionProcess productionProcess) {
        Parameter parameter = Parameter.builder()
                .productionProcess(productionProcess)
                .name(parameterDto.getName())
                .value(parameterDto.getValue())
                .type(parameterDto.getType())
                .build();

        return parameterRepository.save(parameter);
    }

    public Void removeParameterById(Long parameterId) {
        Parameter parameter = getParameterById(parameterId);
        parameterRepository.delete(parameter);
        return null;
    }

    public Parameter getParameterById(Long parameterId) {
        Optional<Parameter> parameter = parameterRepository.findById(parameterId);
        if(parameter.isPresent()){
            return parameter.get();
        }

        throw new NotFoundException(String.format("Parameter with id %s doesnt exist", parameterId));
    }
}
