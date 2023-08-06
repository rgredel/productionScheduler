package pl.edu.pk.wieik.productionScheduler.parameter;

import org.springframework.stereotype.Service;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ParameterDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ParameterType;

import java.util.List;
import java.util.Optional;


@Service
public class ParameterService {
    public double getValueByType(List<ParameterDto> parameters, ParameterType type){
        Optional<ParameterDto> parameterDto = parameters.stream().filter(parameter -> parameter.getType() == type).findFirst();

        return parameterDto.isPresent() ? parameterDto.get().getValue() : null;
    }
}
