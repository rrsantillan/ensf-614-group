// FlightForm.js
import React, { useState } from 'react';
import axios from 'axios';

const FlightForm = () => {
  const [flightid, setFlightId] = useState('');
  const [aircraftid, setAircraftId] = useState('');
  const [destination, setDestination] = useState('');
  const [source, setSource] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [landingTime, setLandingTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an API request to your backend to add the flight to the database
    try {
      axios.post('http://localhost:8081/addFlight', {
        flightid,
        aircraftid,
        destination,
        source,
        departureTime,
        landingTime,
      });

      console.log('Flight added successfully:');
      // You can add additional logic here, such as showing a success message to the user
    } catch (error) {
      console.error('Error adding flight:', error);
      // Handle error and show an error message to the user
    }
  };

  return (
    <form className="flight-form" onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', textAlign: 'left' }}>
      <div className="form-input" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          Destination:
        </label>
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
      </div>
      
      <div className="form-input" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          Source:
        </label>
        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
      </div>
      
      <div className="form-input" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          Flight ID:
        </label>
        <input type="text" value={flightid} onChange={(e) => setFlightId(e.target.value)} />
      </div>

      <div className="form-input" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          Aircraft ID:
        </label>
        <input type="number" value={aircraftid} onChange={(e) => setAircraftId(e.target.value)} />
      </div>

      

      <div className="form-input" style={{ marginBottom: '10px' }}>
        <label>
          Departure Time:
          <input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
        </label>
      </div>

      <div className="form-input" style={{ marginBottom: '10px' }}>
        <label>
          Landing Time:
          <input type="datetime-local" value={landingTime} onChange={(e) => setLandingTime(e.target.value)} />
        </label>
      </div>

      <button type="submit" className="submit-button" style={{ display: 'block', width: '100%' }}>
        Add Flight
      </button>
    </form>
  );
};

export default FlightForm;
