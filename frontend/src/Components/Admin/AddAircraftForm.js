// AddAircraftForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddAircraftForm = () => {
  const [aircraftid, setAircraftId] = useState('');
  const [model, setModel] = useState('');
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an API request to your backend to add the flight to the database
    try {
      axios.post('http://localhost:8081/addAircraft', {
        aircraftid,
        model,
        rows,
        columns
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
      <div className="form-control" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          AircraftVIN:
        </label>
        <input type="text" placeholder='ACX240' value={aircraftid} onChange={(e) => setAircraftId(e.target.value)} />
      </div>
      
      <div className="form-control" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          Aircraft Model:
        </label>
        <input type="text" placeholder='Boeing A420' value={model} onChange={(e) => setModel(e.target.value)} />
      </div>

      <div className="form-control" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          Number of Rows:
        </label>
        <input type="text" placeholder='30' value={rows} onChange={(e) => setRows(e.target.value)} />
      </div>

      <div className="form-control" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          Number of Seats Per Row:
        </label>
        <input type="text" placeholder='6' value={columns} onChange={(e) => setColumns(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-success w-100" style={{ display: 'block', width: '100%' }}>
        Add New Aircraft
      </button>
    </form>
  );
};

export default AddAircraftForm;
