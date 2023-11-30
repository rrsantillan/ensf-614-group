// AddAircraftForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddAircraftForm = () => {
  const [aircraftid, setAircraftId] = useState('');
  const [model, setModel] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an API request to your backend to add the flight to the database
    try {
      axios.post('http://localhost:8081/addAircraft', {
        aircraftid,
        model,
      });

      console.log('Aircraft added successfully:');
      // You can add additional logic here, such as showing a success message to the user
    } catch (error) {
      console.error('Error adding Aircraft:', error);
      // Handle error and show an error message to the user
    }
  };

  return (
    <form className="flight-form" onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', textAlign: 'left' }}>
      <div className="form-input" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          AircraftID:
        </label>
        <input type="text" value={aircraftid} onChange={(e) => setAircraftId(e.target.value)} />
      </div>
      
      <div className="form-input" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          Aircraft Model:
        </label>
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
      </div>

      <button type="submit" className="submit-button" style={{ display: 'block', width: '100%' }}>
        Add New Aircraft
      </button>
    </form>
  );
};

export default AddAircraftForm;
