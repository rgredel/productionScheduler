import React, { useState } from 'react';
import ProductionProcessTaskBox from './ProductionProcessTaskBox';
import AddProductionProcessTaskFormModal from './AddProductionProcessTaskFormModal';
import{ Button, Typography, Modal  } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import Navbar from '../../Navbar/Navbar';
import './../seance.css';


const ProductionProcessTaskList = ({ productionProcess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tasks = productionProcess.tasks

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
    <div className="seances-container">

      <Typography variant="h1"  sx={{flexGrow: "1"}}align='center'>
        {productionProcess.name}<br/>
        {productionProcess.id}
      </Typography>

      <Button sx={{ width: '100%' }} size="large" variant="contained" color="addButton" startIcon={<AddIcon/>} onClick={openModal}>Dodaj nowe zadanie</Button>

      {tasks.map(task => (
        <ProductionProcessTaskBox key={task.id} productionProcess={productionProcess} productionProcessTask={task} />
      ))}
      
      <div>

      <Modal
            open={isModalOpen}
            onClose={closeModal}
      >
          <AddProductionProcessTaskFormModal productionProcess={productionProcess} closeModal={closeModal} />
      </Modal>
    </div>
    </div>
    </div>
  );
}

export default ProductionProcessTaskList;