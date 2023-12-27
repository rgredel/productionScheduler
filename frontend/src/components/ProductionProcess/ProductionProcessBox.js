import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Modal } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useLocalState } from '../../util/useLocalStorage';
import Divider from '@mui/material/Divider';


import UpdateProductionProcessFormModal from './UpdateProductionProcessFormModal';


import './seance.css';

const ProductionProcessBox = ({ productionProcess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jwt, setJwt] = useLocalState("", "jwt");

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
          "Authorization": `Bearer ${jwt}`
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
        <i>{productionProcess.name}</i>
      </Typography>
      <Divider>Id</Divider>
      <Typography align='center' sx={{ margin: '15px' }} variant="h5" gutterBottom>
        {productionProcess.id}
      </Typography>
      <Divider>Ilość maszyn</Divider>
      <Typography align='center' sx={{ margin: '15px' }} variant="h5" gutterBottom>
        {availableProcessors()}
      </Typography>
      <Divider>Ilość zadań</Divider>
      <Typography align='center' sx={{ margin: '15px' }} variant="h5" gutterBottom>
        {tasks()}
      </Typography>
      <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
        <Button sx={{ width: '25%' }} variant="contained" color="deleteButton" startIcon={<DeleteForeverIcon />} onClick={deleteProductionProcess}>Usuń</Button>
        <Button sx={{ width: '25%' }} onClick={openModal} color="editButton" startIcon={<EditIcon />}>Edytuj</Button>
        <Button sx={{ width: '25%' }} onClick={() => window.location.href = '/productionProcess/' + productionProcess.id} color="manageButton" startIcon={<ListAltIcon />}>Zarządzaj zadaniami</Button>
        <Button sx={{ width: '25%' }} onClick={() => window.location.href = '/schedule/' + productionProcess.id} color="silverButton" startIcon={<CalendarMonthIcon />}>Uszereguj</Button>
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