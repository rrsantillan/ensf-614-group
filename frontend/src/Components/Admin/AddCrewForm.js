// AddAircraftForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddCrewForm = () => {
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [position, setPosition] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an API request to your backend to add the flight to the database
    try {
      axios.post('http://localhost:8081/admin/addNewCrew', {
        fname,
        lname,
        position,
      });

      console.log('New crew member added successfully:');
      alert("New crew member added successfully");
      // You can add additional logic here, such as showing a success message to the user
    } catch (error) {
      console.error('Error adding new crew member:', error);
      // Handle error and show an error message to the user
    }
  };


  return (
    <form className="flight-form" onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', textAlign: 'left' }}>
      <div className="form-input" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          First Name:
        </label>
        <input type="text" value={fname} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      
      <div className="form-input" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          Last Name:
        </label>
        <input type="text" value={lname} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div className="form-input" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px' }}>
          Position/Title:
        </label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-success w-100" style={{ display: 'block', width: '100%' }}>
        Add New Crew
      </button>
    </form>
  );
};

export default AddCrewForm;
