import React, { useState } from 'react';

import { Button, ButtonGroup, Modal, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './../seance.css';

import UpdateProductionProcessTaskFormModal from './UpdateProductionProcessTaskFormModal';



const ProductionProcessTaskBox = ({ productionProcess, productionProcessTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteTask = async (event) => {
    try {
      const response = await fetch(`/productionProcess/task/${productionProcessTask.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "delete"
      })

      if (response.status === 200) {
        alert('Usunięto zadanie pomyślnie!');
      } else if (response.status === 409) {
        setError("Błąd autoryzacji, zaloguj się ponownie!");
      } else {
        throw new Error();
      }

    } catch (error) {
      console.log(error);
      setError('An error occurred, please try again later.')
    }
    window.location.reload();
  }

  console.log(productionProcessTask)
  return (
    <div className="seance-box">
      <Typography variant="h2" gutterBottom align='center'>
          {productionProcessTask.task.name}<br/>
          {productionProcessTask.id}
      </Typography>

      <Typography sx={{ margin: '15px' }} variant="h4" gutterBottom>
         Opis: <b><i>{productionProcessTask.task.description}</i></b>
      </Typography>
      <Typography sx={{ margin: '15px' }} variant="h4" gutterBottom>
        Zadania poprzedzające: <b><i>{productionProcessTask.previousTaskIds.join(', ')}</i></b>
      </Typography>
  
      <Typography sx={{ margin: '15px' }} variant="h4" gutterBottom>
        Zadania kolejne: <b><i>{productionProcessTask.nextTaskIds.join(', ')}</i></b>
      </Typography>

      <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
        <Button sx={{ width: '50%' }} variant="contained" color="deleteButton" startIcon={<DeleteForeverIcon />} onClick={deleteTask}>Usuń</Button>
        <Button sx={{ width: '50%' }} onClick={openModal} color="editButton" startIcon={<EditIcon />}>Edytuj</Button>
      </ ButtonGroup>
      <Modal
            open={isModalOpen}
            onClose={closeModal}
          >
        <UpdateProductionProcessTaskFormModal productionProcess={productionProcess} productionProcessTask={productionProcessTask} closeModal={closeModal} />
      </Modal>

    </div>
  );
}

export default ProductionProcessTaskBox;