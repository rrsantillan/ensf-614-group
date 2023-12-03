// FlightForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightForm = () => {

  // for INSERT query data
  const [aircraftid, setAircraftId] = useState('');
  const [destination, setDestination] = useState('');
  const [source, setSource] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [landingTime, setLandingTime] = useState('');

  const [aircraftList, setAircraftList] = useState([]); // Add state to store the list of aircraft pulled from database

  // SELECT aircraft info from database
  useEffect(() => {
    const fetchAircraftList = async () => {
      try {
        const response = await axios.post('http://localhost:8081/admin/getAircraftIDs');
        console.log("Response from server:", response);
        setAircraftList(response.data.planes); // Make sure to access the correct property
      } catch (error) {
        console.error('Error fetching aircraft list:', error);
      }
    };
    fetchAircraftList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an API request to your backend to add the flight to the database
    try {
      axios.post('http://localhost:8081/admin/addFlight', {
        aircraftid,
        destination,
        source,
        departureTime,
        landingTime,
      });
      // You can add additional logic here, such as showing a success message to the user
      console.log('Flight added successfully:');
      alert("Flight added successfully!");
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
          Aircraft ID, Model:
        </label>
        <select value={aircraftid} onChange={(e) => setAircraftId(e.target.value)}>
          <option value="" disabled>Select Aircraft</option>
           {aircraftList ? (
              aircraftList.map((aircraft) => (
              <option key={aircraft.AIRPLANEVIN} value={aircraft.AIRPLANEVIN}>
                {aircraft.AIRPLANEVIN}, {aircraft.MODEL}
              </option>
            ))
          ) : null}
        </select>
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
