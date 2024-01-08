import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box } from "@mui/material";
import Switch from '@mui/material/Switch';
import { useLocalState } from '../../../util/useLocalStorage';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';


const UpdateProductionProcessTaskFormModal = ({ closeModal, productionProcess, productionProcessTask}) => {
  const [productionProcessTaskName, setProductionProcessTaskName] = useState(productionProcessTask.task.name);
  const [error, setError] = useState('');
  const [selectedPreviousTasks, setSelectedPreviousTasks] = useState(productionProcessTask.previousTaskIds);
  const [inheritedPreviousTasks, setInheritedPreviousTasks] = useState([]);
  const [description, setDescription] = useState(productionProcessTask.task.description);
  const [parameters, setParameters] = useState(productionProcessTask.parameters);
  const [maxRequiredProcessors, setMaxRequiredProcessors] = useState(0);
  const [jwt, setJwt] = useLocalState("", "jwt");

    const style = {
    maxHeight: "calc(100vh - 200px)",
    overflow: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: '#cbe0fa',
    border: '2px solid #00308F',
    boxShadow: 24,
    p: 4
  };

  const parameterTypes = [
    "TIME",
    "REQUIRED_PROCESSORS",
    "LATEST_POSSIBLE_END_TIME"
    ];
  
  const availableProcessors = () => {
    const tasksWithAvailableProcessorsParam = productionProcess.parameters.find(element => element.type === "AVAILABLE_PROCESSORS")
    return tasksWithAvailableProcessorsParam == null ? 0 : tasksWithAvailableProcessorsParam.value
  };
  const getDefaultForMissingParameters = (missingTypes) => {
    return missingTypes.map(type => ({ name: 'type', value: 1, type }));
  };

  const updateParametersWithDefaults = () => {
  const taskParameters = productionProcessTask.parameters || []
    const existingParameterTypes = taskParameters.map(param => param.type);
    const missingParameters = parameterTypes.filter(type => !existingParameterTypes.includes(type));      
    if (missingParameters.length > 0) {
      setParameters([...taskParameters, ...getDefaultForMissingParameters(missingParameters)]);
    }
  };

  useEffect(() => {
    updateParametersWithDefaults();
    possiblePrevTasks();
    setMaxRequiredProcessors(availableProcessors());
  }, []);

  useEffect(() => {
    const allInheritedExludingSelected = getAllInheritedPrevTasks().filter(id => !selectedPreviousTasks.includes(id));
    setInheritedPreviousTasks(allInheritedExludingSelected)
  }, [selectedPreviousTasks]);
  
  const possiblePrevTasks = () =>{
    const currentTask = productionProcessTask.id;
    const filteredTasksArray = productionProcess.tasks.filter(task => task.id !== currentTask && !task.previousTaskIds.includes(currentTask));
    console.log(filteredTasksArray);
    return filteredTasksArray;
  }

  const getAllInheritedPrevTasks = () => {  
    const getAllInheritedTasks = taskId => {
      const task = productionProcess.tasks.find(t => t.id === taskId);
      if (!task) {
        return [];
      }
  
      const inheritedTasks = [task];
      const { previousTaskIds } = task;
  
      if (previousTaskIds && previousTaskIds.length > 0) {
        previousTaskIds.forEach(prevTaskId => {
          const prevTasks = getAllInheritedTasks(prevTaskId);
          inheritedTasks.push(...prevTasks);
        });
      }
  
      return inheritedTasks;
    };
  
    const inheritedTasks = selectedPreviousTasks.reduce((acc, taskId) => {
      const tasks = getAllInheritedTasks(taskId);
      return acc.concat(tasks);
    }, []);
  
    return inheritedTasks.map(task => task.id);
  };

  const handleCheckboxChange = event => {

    const taskId =  parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedPreviousTasks(prevSelected => [...prevSelected, taskId]);
    } else {
      setSelectedPreviousTasks(prevSelected => {
          const newPrev = prevSelected.filter(id => id !== taskId);
          return newPrev
      });
      
    }
  }

  const toggleParameter = (index) => {
    setParameters((prevParameters) => {
      const updatedParameters = [...prevParameters];
      updatedParameters[index].isMax = !updatedParameters[index].isMax;

      if(updatedParameters[index].type === 'REQUIRED_PROCESSORS' ){
        updatedParameters[index].value = maxRequiredProcessors;
      }
      if(updatedParameters[index].type === 'LATEST_POSSIBLE_END_TIME' ){
        updatedParameters[index].value = 1000000000;
      }
      
      return updatedParameters;
    });
  };

  const handleParameterChange = (index, field, value) => {
    console.log("val:", value)
      const newParameters = [...parameters];
      if (field === 'value' && value <= 0) {
        newParameters[index][field] = 1;
        const error = 'Wartość parametru musi być większa od 0';
        console.log(error)
        setError(error)
        return;
      }

        if (field === 'value' && newParameters[index].type === 'REQUIRED_PROCESSORS' && value > maxRequiredProcessors) {
        const error = `Maksymalna wartość dla REQUIRED_PROCESSORS to ${maxRequiredProcessors}`
        newParameters[index][field] = maxRequiredProcessors;
        setParameters(newParameters);
        setError(error)
        return;
      }
      newParameters[index][field] = value;
      setParameters(newParameters);
  }


  const handleSubmit = async (event) => {
      const reqBody = {
          name: productionProcessTaskName,  
          description: description,
          parameters: parameters,
          previousTaskIds: selectedPreviousTasks
        }; 
      try {
        console.log(reqBody)
          const response = await fetch(`/productionProcess/${productionProcess.id}/task/${productionProcessTask.id}` , {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
              },
              method: "put",
              body: JSON.stringify(reqBody),
            })
          
          if(response.status === 200) {
              const data = await response.json();
              alert('Edytowano pomyślnie!');
            } else if(response.status === 409) {
              const data = await response.json();
              setError("Błąd autoryzacji, zaloguj się ponownie!");
            } else {
              throw new Error();
            }
            
      } catch(error) {
          console.log(error);
          setError('An error occurred, please try again later.')
      }
      closeModal(); 
    }

  return (
    <Box sx={style}>

      <Typography variant="h4" gutterBottom align="center">
        Edytuj zadanie
      </Typography>

      <form onSubmit={handleSubmit}>
      <TextField
          disabled
          id="outlined-basic"
          label="Id"
           defaultValue={productionProcessTask.id}
          variant="outlined"
          checked={null}
          fullWidth
          margin="normal"
        />

        <TextField
          id="outlined-basic"
          label="Nazwa"
          defaultValue={productionProcessTaskName}
          variant="outlined"
          fullWidth
          margin="normal"
          value={productionProcessTaskName}
          onChange={(event) => setProductionProcessTaskName(event.target.value)}
        />

      <TextField
          id="outlined-multiline-static"
          label="Opis"
          fullWidth
          multiline
          margin="normal"
          defaultValue={description}
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Zadania poprzedzające</FormLabel>
        <FormGroup>
        {possiblePrevTasks().map(task => (
          <FormControlLabel
            control={
              <Checkbox checked={selectedPreviousTasks.includes(task.id)}
               disabled={inheritedPreviousTasks.includes(task.id)}
               value={task.id}
               onChange={handleCheckboxChange}/>
            }
            label={`${task.id} - ${task.task.name}`}
          />
          ))}
        </FormGroup>
      </FormControl>
          {parameters.map((param, index) => (
            <div key={index} style={{width: '100%'}}>
            <TextField
              id="outlined-basic"
              label="Nazwa"
              defaultValue={param.name}
              variant="outlined"
              sx={{width: '50%'}}
              margin="normal"
              value={param.name}
              onChange={event => handleParameterChange(index, "name", event.target.value)}
            />    
            <TextField
                          sx={{width: '40%'}}

              id="outlined-basic"
              label={param.type}
              type="number"
              defaultValue={param.value}
              variant="outlined"
              margin="normal"
              value={param.value}
              disabled={param.isMax}
              onChange={event => handleParameterChange(index, "value", parseInt(event.target.value))}
            />
            <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
            <FormControlLabel
              value="top"
              control={<Switch color="primary"
                         checked={param.isEnabled}
                        onChange={() => toggleParameter(index)}
                        disabled={param.type === "TIME"} />
                      }
              label="Max"
              labelPlacement="top"
            />
          </FormGroup>
          </FormControl>
            </div>
          ))}
        <br />
              {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
        <br />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          color="editButton"
           startIcon={<EditIcon />}
        >
          Edytuj
        </Button>
      </form>
      </ Box>
  );
};

export default UpdateProductionProcessTaskFormModal;