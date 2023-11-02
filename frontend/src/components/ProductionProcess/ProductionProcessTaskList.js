import React, { useState } from 'react';
import ProductionProcessTaskBox from './ProductionProcessTaskBox';
import AddProductionProcessTaskFormModal from './AddProductionProcessTaskFormModal';
import Modal from 'react-modal';


import './seance.css';

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
    <div className="seances-container">
      {tasks.map(task => (
        <ProductionProcessTaskBox key={task.id} productionProcess={productionProcess} productionProcessTask={task} />
      ))}
      
      <div>
      <button onClick={openModal}>Dodaj nowe zadanie</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
          <AddProductionProcessTaskFormModal productionProcess={productionProcess} closeModal={closeModal} />
      </Modal>
    </div>
    
    </div>
  );
}

export default ProductionProcessTaskList;