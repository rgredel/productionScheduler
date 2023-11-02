import React from 'react';
import SeanceBox from './SeanceBox';
import './seance.css';

const SeanceList = ({ seances }) => {
  return (
    <div className="seances-container">
      {seances.map(seance => (
        <SeanceBox key={seance.id} seance={seance} />
      ))}
    </div>
  );
}

export default SeanceList;