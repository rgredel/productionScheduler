import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const UpdateProductionProcessTaskFormModal = ({ closeModal, productionProcess}) => {
  const [productionProcessName, setProductionProcessName] = useState(productionProcess.name);
  const [availableProcessors, setAvailableProcessors] = useState(1);

  const currentAvailableProcessors = () => {
    const tasksWithAvailableProcessorsParam = productionProcess.parameters.find(element => element.type === "AVAILABLE_PROCESSORS")
    return tasksWithAvailableProcessorsParam == null ? 0 : tasksWithAvailableProcessorsParam.value
  };

  useEffect(() => {
    setAvailableProcessors(currentAvailableProcessors())
    }, []);

  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    const reqBody = {
      name: productionProcessName,
      availableProcessors: availableProcessors
    };
    try {
      const response = await fetch(`/productionProcess/${productionProcess.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "put",
        body: JSON.stringify(reqBody),
      })

      if (response.status === 200) {
        const data = await response.json();
        alert('Edytowano pomyślnie!');
      } else if (response.status === 409) {
        const data = await response.json();
        setError("Błąd autoryzacji, zaloguj się ponownie!");
      } else {
        throw new Error();
      }

    } catch (error) {
      console.log(error);
      setError('An error occurred, please try again later.')
    }
    window.location.reload();
    closeModal();
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#cbe0fa',
    border: '2px solid #00308F',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={style}>
      <Typography variant="h4" gutterBottom align="center">
        Edytuj proces produkcyjny
      </Typography>

      <form onSubmit={handleSubmit}>
      <TextField
          id="outlined-basic"
          label="Id"
          defaultValue={productionProcess.id}
          variant="outlined"
          fullWidth
          disabled
          margin="normal"
        />
        <TextField
          id="outlined-basic"
          label="Nazwa"
          defaultValue={productionProcessName}
          variant="outlined"
          fullWidth
          margin="normal"
          value={productionProcessName}
          onChange={(event) => setProductionProcessName(event.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Dostępne maszyny"
          type="number"
          defaultValue={availableProcessors}
          variant="outlined"
          fullWidth
          margin="normal"
          value={availableProcessors}
          onChange={(event) =>
            setAvailableProcessors(parseInt(event.target.value, 10))
          }
        />

        {error && (
          <Typography variant="body2" color="error" align="center" paragraph>
            {error}
          </Typography>
        )}

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
    </Box>
  );
};

export default UpdateProductionProcessTaskFormModal;