import React, { useState } from 'react';

import { Button, ButtonGroup, Modal, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './../seance.css';
import { useLocalState } from '../../../util/useLocalStorage';
import Divider from '@mui/material/Divider';

import UpdateProductionProcessTaskFormModal from './UpdateProductionProcessTaskFormModal';



const ProductionProcessTaskBox = ({ productionProcess, productionProcessTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jwt, setJwt] = useLocalState("", "jwt");

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
          "Authorization": `Bearer ${jwt}`
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
      setError('Wystąpił błąd. Spróbuj ponownie później.')
    }
    window.location.reload();
  }

  console.log(productionProcessTask)
  return (
    <div className="seance-box">
      <Typography variant="h2" gutterBottom align='center'>
          <i>{productionProcessTask.task.name}</i>
      </Typography>

      <Divider>Id</Divider>
      <Typography align='center' sx={{ margin: '15px' }} variant="h5" gutterBottom>
      {productionProcessTask.id}
      </Typography>

      <Divider>Opis</Divider>
      <Typography align='center' sx={{ margin: '15px' }} variant="h5" gutterBottom>
            {productionProcessTask.task.description}
      </Typography>
  
      <Divider>Zadania poprzedzające</Divider>
      <Typography align='center' sx={{ margin: '15px' }} variant="h5" gutterBottom>
         {productionProcessTask.previousTaskIds.join(', ')}
      </Typography>

      <Divider>Zadania następne</Divider>
      <Typography align='center' sx={{ margin: '15px' }} variant="h5" gutterBottom>
         {productionProcessTask.nextTaskIds.join(', ')}
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