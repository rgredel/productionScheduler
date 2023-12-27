import React, { useState } from 'react';
import ProductionProcessBox from './ProductionProcessBox';
import AddProductionProcessFormModal from './AddProductionProcessFormModal';
import { Button, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


import './seance.css';
import Navbar from '../Navbar/Navbar';

const ProductionProcessList = ({ productionProcesses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="root">
      <Navbar />
      <div className="seances-container">
        <Button sx={{ width: '100%' }} size="large" variant="contained" color="addButton" startIcon={<AddIcon />} onClick={openModal}>Dodaj proces produkcyjny</Button>
        {productionProcesses.map(productionProcess => (
          <ProductionProcessBox key={productionProcess.id} productionProcess={productionProcess} />
        ))}
        <div className='modal-box'>
          <Modal
            open={isModalOpen}
            onClose={closeModal}
          >
            <AddProductionProcessFormModal closeModal={closeModal} />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ProductionProcessList;