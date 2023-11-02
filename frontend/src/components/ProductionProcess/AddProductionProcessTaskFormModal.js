import React, { useEffect, useState } from 'react';

const AddProductionProcessTaskFormModal = ({ closeModal, productionProcess}) => {
  const [productionProcessTaskName, setProductionProcessTaskName] = useState('');
  const [error, setError] = useState('');
  const [selectedPreviousTasks, setSelectedPreviousTasks] = useState([]);
  const [description, setDescription] = useState();
  const parameterTypes = [
    "TIME",
    "REQUIRED_PROCESSORS",
    "LATEST_POSSIBLE_START_TIME",
    "REQUIRED_MATERIAL"
  ];

  const [parameters, setParameters] = useState([
    { name: '', value: 1, type: parameterTypes[0] }
  ]);

  const allTasks = () => {
    return productionProcess.tasks;
  }

  const handleCheckboxChange = event => {
    const taskId = event.target.value;
    if (event.target.checked) {
      setSelectedPreviousTasks(prevSelected => [...prevSelected, taskId]);
    } else {
      setSelectedPreviousTasks(prevSelected =>
        prevSelected.filter(id => id !== taskId)
      );
    }
  }
  const addParameter = () => {
    setParameters(prevParameters => [...prevParameters, {name: '', value: 1, type: '' }]);
  }

  const removeParameter = (index) => {
    setParameters(prevParameters => prevParameters.filter((param, i) => i !== index));
  }

  const handleParameterChange = (index, field, value) => {
    const newParameters = [...parameters];
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
          const response = await fetch(`/productionProcess/${productionProcess.id}/task` , {
              headers: {
                "Content-Type": "application/json",
              },
              method: "post",
              body: JSON.stringify(reqBody),
            })
          
          if(response.status === 200) {
              const data = await response.json();
              alert('Dodano pomyślnie!');
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
      closeModal(); // Close the modal after form submission
    }

  return (
    <div>
      <h2>Form Modal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
                  type="text"
                  name="taskName"
                  placeholder='Nazwa zadania'
                  value={productionProcessTaskName}
                  onChange={event => setProductionProcessTaskName(event.target.value)}
            />
        </label>
        <label>
          Opis:
            <input
                  type="text"
                  name="description"
                  placeholder='Opis zadania'
                  value={description}
                  onChange={event => setDescription(event.target.value)}
            />
        </label>
        <label>
          Zadania poprzedzające:
          {allTasks().map(task => (
            <label key={task.id}>
              <input
                type="checkbox"
                value={task.id}
                defaultChecked={selectedPreviousTasks.includes(task.id)}
                onChange={handleCheckboxChange}
              />
              {task.id} - {task.task.name}
            </label>
          ))}
        </label>
        <label>
          Parameters:
          {parameters.map((param, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Parameter name"
                value={param.name}
                onChange={event => handleParameterChange(index, "name", event.target.value)}
              />
              <input
                type="number"
                placeholder="Parameter value"
                value={param.value}
                onChange={event => handleParameterChange(index, "value", parseInt(event.target.value))}
              />
              <select
                value={param.type}
                onChange={event => handleParameterChange(index, "type", event.target.value)}
              >
                {parameterTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => removeParameter(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addParameter}>Add Parameter</button>
        </label>

        <br />
              {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductionProcessTaskFormModal;