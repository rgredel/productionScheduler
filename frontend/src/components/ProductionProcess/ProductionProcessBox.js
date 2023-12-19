import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Modal } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import UpdateProductionProcessFormModal from './UpdateProductionProcessFormModal';


import './seance.css';

const ProductionProcessBox = ({ productionProcess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const availableProcessors = () => {
    const tasksWithAvailableProcessorsParam = productionProcess.parameters.find(element => element.type === "AVAILABLE_PROCESSORS")
    return tasksWithAvailableProcessorsParam == null ? 0 : tasksWithAvailableProcessorsParam.value
  };

  const tasks = () => {
    const tasksWithAvailableProcessorsParam = productionProcess.tasks;

    if (tasksWithAvailableProcessorsParam && Array.isArray(tasksWithAvailableProcessorsParam)) {
      return tasksWithAvailableProcessorsParam.length;
    } else {
      return 0;
    }
  }
  const [message, setMessage] = useState('');

  const deleteProductionProcess = async (event) => {
    try {
      const response = await fetch(`/productionProcess/${productionProcess.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "delete"
      })

      if (response.status === 200) {
        setMessage('Usunięto zadanie pomyślnie!');
      } else if (response.status === 409) {
        setMessage("Błąd autoryzacji, zaloguj się ponownie!");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      setMessage('An error occurred, please try again later.')
    }
    window.location.reload();
  }
  return (
    <div className="seance-box">
      <Typography variant="h2" gutterBottom align='center'>
        {productionProcess.name}
      </Typography>

      <Typography sx={{ margin: '15px' }} variant="h4" gutterBottom>
        Maszyny: <b><i>{availableProcessors()}</i></b>
      </Typography>
      <Typography sx={{ margin: '15px' }} variant="h4" gutterBottom>
        Zadania: <b><i>{tasks()}</i></b>
      </Typography>
      <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
        <Button sx={{ width: '25%' }} variant="contained" color="deleteButton" startIcon={<DeleteForeverIcon />} onClick={deleteProductionProcess}>Usuń</Button>
        <Button sx={{ width: '25%' }} onClick={openModal} color="editButton" startIcon={<EditIcon />}>Edytuj</Button>
        <Button sx={{ width: '25%' }} component={Link} to={'/productionProcess/' + productionProcess.id} color="manageButton" startIcon={<ListAltIcon />}>Zarządzaj zadaniami</Button>
        <Button sx={{ width: '25%' }} component={Link} to={'/schedule/' + productionProcess.id} color="silverButton" startIcon={<CalendarMonthIcon />}>Uszereguj</Button>
      </ ButtonGroup>

          <Modal
            open={isModalOpen}
            onClose={closeModal}
          >
              <UpdateProductionProcessFormModal closeModal={closeModal} productionProcess={productionProcess} />
          </Modal>

    </div >
  );
}

export default ProductionProcessBox;