import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import './seance.css';
import Modal from 'react-modal';
import UpdateProductionProcessTaskFormModal from './UpdateProductionProcessTaskFormModal';



const ProductionProcessTaskBox = ({ productionProcess, productionProcessTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(productionProcessTask)
    return (
      <div className="seance-box">
        <p>Id:<br/> {productionProcessTask.id}</p><br/> 
        <p>Nazwa:<br/> {productionProcessTask.task.name}</p><br/> 
        <p>Opis:<br/> {productionProcessTask.task.description}</p><br/> 
        <p>Zadania poprzedzające:<br/> {productionProcessTask.previousTaskIds.join(', ')}</p><br/>
        <button onClick={openModal}>Edytuj</button>

        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
          <UpdateProductionProcessTaskFormModal productionProcess={productionProcess} productionProcessTask={productionProcessTask} closeModal={closeModal} />
      </Modal>

      </div>
    );
  }

export default ProductionProcessTaskBox;