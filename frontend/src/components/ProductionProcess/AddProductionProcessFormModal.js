import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useLocalState } from '../../util/useLocalStorage';

const AddProductionProcessTaskFormModal = ({ closeModal }) => {
  const [productionProcessName, setProductionProcessName] = useState('');
  const [availableProcessors, setAvailableProcessors] = useState(1);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    const reqBody = {
      name: productionProcessName,
      availableProcessors: availableProcessors
    };
    try {
      const response = await fetch("/productionProcess", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
        method: "post",
        body: JSON.stringify(reqBody),
      })

      if (response.status === 200) {
        const data = await response.json();
        alert('Dodano pomyślnie!');
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
        Nowy proces produkcyjny
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Nazwa"
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
          color="addButton" 
          startIcon={<AddIcon />}
        >
          Dodaj
        </Button>
      </form>
    </Box>
  );
};

export default AddProductionProcessTaskFormModal;