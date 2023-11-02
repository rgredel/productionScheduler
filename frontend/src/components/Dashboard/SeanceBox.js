import React from 'react';
import { Link } from 'react-router-dom';
import './seance.css';

const SeanceBox = ({ seance }) => {
    return (
      <div className="seance-box">
        <p>Title:<br/> {seance.movie.title}</p>
        <p>Duration:<br/> {seance.movie.duration}min</p>
        <p>Start Date:<br/> {new Date(seance.startDate).toLocaleDateString() + " " + new Date(seance.startDate).toLocaleTimeString([], {hour12: false})}</p>
        <p>End Date:<br/> {new Date(seance.endDate).toLocaleDateString() + " " + new Date(seance.endDate).toLocaleTimeString([], {hour12: false})}</p>
        <p>Room:<br/> {seance.room.name}</p>
        <p>Available seats:<br/> {seance.availableSeats}/{seance.room.seats}</p>
        <Link to='/reservation'
          state = {seance } >
          <button>Reservate</button>
        </Link>
      </div>
    );
  }

export default SeanceBox;