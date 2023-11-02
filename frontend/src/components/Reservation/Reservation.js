import {React, useState} from 'react';
import { useLocation } from 'react-router-dom'
import { useLocalState } from '../../util/useLocalStorage';
import './Reservation.css'
const Reservation = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const location = useLocation()
  const [seance, setSeance] = useState(location.state);

  const startDate = new Date(seance.startDate).toLocaleDateString() + " " + new Date(seance.startDate).toLocaleTimeString([], {hour12: false});
  const endDate = new Date(seance.endDate).toLocaleDateString() + " " + new Date(seance.endDate).toLocaleTimeString([], {hour12: false});

  console.log("Reservation: ",seance)
  const handleSeatSelection = (seat) => {
    if(seance.freeSeats.includes(seat)) setSelectedSeat(seat);
  }
  const seats = Array.from(Array(seance.room.seats).keys()).map(x => x + 1);
  const chunk = 15;
  const rows =  seats.map((seat, i) => {
    return i % chunk === 0 ? seats.slice(i, i + chunk) : null;
  }).filter((row) => { return row; });

  const sendReservation = async (event) => {
  if(!selectedSeat){
    alert('Seat is not selected!');
    return;
  }
  const reqBody= {
      seat: selectedSeat,
      idPerson: 1,
      idSeance: seance.id
  }
  try {
      const response = await fetch("/reservations", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
          },
          method: "post",
          body: JSON.stringify(reqBody),
        })
      
      if(response.status === 200) {
          alert(`Seat ${reqBody.seat} reserved!`);
          const newSeance = seance
          newSeance.freeSeats = newSeance.freeSeats.filter(item => item !== reqBody.seat);
          setSeance(newSeance);
          setSelectedSeat(undefined);
        } else if(response.status === 400 || response.status === 409) {
          const data = await response.json();
          alert(data.message);
        } else {
          throw new Error();
        }
  } catch(error) {
      console.log(error);
      alert('An error occurred, please try again later.')
  }
  }

  return (
    <div className="reservation">
      <p>Title: {seance.movie.title}</p>
      <p>Duration: {seance.movie.duration}min</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      <p>Free seats:</p>
      <div>
        {rows.map((row, index) => (
          <ul key={index}>
            {row.map(seat => (
              <li 
              key={seat} 
              className={seance.freeSeats.includes(seat) ? "" : "booked"}
              style={seance.freeSeats.includes(seat) ? (seat === selectedSeat ? {background: "#40f09b", border: "solid"} : {} ) : {background: "red"}}
              onClick={() => handleSeatSelection(seat)}
            >
              {seat}
            </li>
            ))}
          </ul>
        ))}
       Selected seat: {selectedSeat} <br></br>
       <button onClick={sendReservation} >Reservate</button>
      </div>
    </div>
  );
  }

export default Reservation;