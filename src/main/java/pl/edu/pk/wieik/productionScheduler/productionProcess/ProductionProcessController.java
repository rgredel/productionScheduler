package pl.edu.pk.wieik.productionScheduler.productionProcess;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pk.wieik.productionScheduler.parameter.model.Parameter;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.AddProductionProcessParameterDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.CreateProductionProcessDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ProductionProcessDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.dto.ProductionProcessTaskDto;
import pl.edu.pk.wieik.productionScheduler.productionProcess.model.ProductionProcess;
import pl.edu.pk.wieik.productionScheduler.productionProcess.task.AddProductionProcessTaskDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductionProcessController {
    private final ProductionProcessService productionProcessService;

    @PostMapping("/productionProcess")
    public ResponseEntity<ProductionProcess> createProductionProcess(@RequestBody CreateProductionProcessDto createProductionProcessDto){
        return ResponseEntity.ok(productionProcessService.createProductionProcess(createProductionProcessDto));
    }

    @PostMapping("/productionProcess/{id}/task")
    public ResponseEntity<ProductionProcessTaskDto> addTask(@PathVariable Long id, @RequestBody AddProductionProcessTaskDto addProductionProcessTaskDto){
        return ResponseEntity.ok(productionProcessService.addProductionProcessTask(id, addProductionProcessTaskDto));
    }

    @PutMapping("/productionProcess/{productionProcessId}/task/{taskId}")
    public ResponseEntity<ProductionProcessTaskDto> updateTask(@PathVariable Long productionProcessId, @PathVariable Long taskId, @RequestBody AddProductionProcessTaskDto addProductionProcessTaskDto){
        return ResponseEntity.ok(productionProcessService.updateProductionProcessTask(productionProcessId, taskId, addProductionProcessTaskDto));
    }

    @GetMapping("/productionProcess/{id}/tasks")
    public ResponseEntity<List<ProductionProcessTaskDto>> getAllProductionProcessTasks(@PathVariable Long id){
        return ResponseEntity.ok(productionProcessService.getAllProductionProcessTasks(id));
    }

    @GetMapping("/productionProcess/{id}")
    public ResponseEntity<ProductionProcessDto> getProductionProcess(@PathVariable Long id){
        return ResponseEntity.ok(productionProcessService.getProductionProcessDtoById(id));
    }

    @GetMapping("/productionProcess")
    public ResponseEntity<List<ProductionProcessDto>> getAllProductionProcessTasks(){
        return ResponseEntity.ok(productionProcessService.getAllProductionProcesses());
    }

    @DeleteMapping("/productionProcess/task/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
        return ResponseEntity.ok(productionProcessService.removeProductionProcessTask(id));
    }


    @PostMapping("/productionProcess/{id}/parameter")
    public ResponseEntity<Parameter> addProductionProcessParameter(@PathVariable Long id, @RequestBody AddProductionProcessParameterDto addProductionProcessParameterDto){
        return ResponseEntity.ok(productionProcessService.addProductionProcessParameter(id, addProductionProcessParameterDto));
    }

    @DeleteMapping("/productionProcess/parameter/{id}")
    public ResponseEntity<Void> deleteProductionProcessParameter(@PathVariable Long id){
        return ResponseEntity.ok(productionProcessService.removeParameterFromProductionProcess(id));
    }

}
