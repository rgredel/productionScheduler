import React, { useState } from 'react';
import ProductionProcessBox from './ProductionProcessBox';
import AddProductionProcessFormModal from './AddProductionProcessFormModal';
import Modal from 'react-modal';


import './seance.css';

const ProductionProcessList = ({ productionProcesses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="seances-container">
      {productionProcesses.map(productionProcess => (
        <ProductionProcessBox key={productionProcess.id} productionProcess={productionProcess} />
      ))}
      
      <div>
      <button onClick={openModal}>Dodaj nowy proces produkcyjny</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
          <AddProductionProcessFormModal closeModal={closeModal} />
      </Modal>
    </div>
    
    </div>
  );
}

export default ProductionProcessList;