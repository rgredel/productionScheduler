import React from 'react';
import { Link } from 'react-router-dom';
import './seance.css';

const ProductionProcessBox = ({ productionProcess }) => {
  const availableProcessors = () => {
    const tasksWithAvailableProcessorsParam  = productionProcess.parameters.find(element => element.type === "AVAILABLE_PROCESSORS")
    return tasksWithAvailableProcessorsParam == null ? 0 : tasksWithAvailableProcessorsParam.value
};
    return (
      <div className="seance-box">
        <p>Id:<br/> {productionProcess.id}</p>
        <p>Nazwa:<br/> {productionProcess.name}</p>
        <p>Dostępne maszyny:<br/> {availableProcessors()}</p>
        <Link to={'/productionProcess/' + productionProcess.id}>
          <button>Szczegóły</button>
        </Link>
        <Link to={'/schedule/' + productionProcess.id}>
          <button>Uszeregowanie</button>
        </Link>
      </div>
    );
  }

export default ProductionProcessBox;