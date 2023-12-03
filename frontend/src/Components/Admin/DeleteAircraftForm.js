import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteAircraftForm = () => {
  const [aircraftid, setAircraftId] = useState('');
  const [aircraftList, setAircraftList] = useState([]);

  useEffect(() => {
    const fetchAircraftList = async () => {
      try {
        const response = await axios.post('http://localhost:8081/admin/getAircraftIDs');
        console.log("Response from server:", response);
        setAircraftList(response.data.planes);
      } catch (error) {
        console.error('Error fetching aircraft list:', error);
      }
    };
    fetchAircraftList();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/admin/removeAircraft', {
        aircraftid
      });

      console.log('Aircraft deleted successfully:');
      alert("Aircraft deleted successfully");
      // Fetch the updated list after deletion
      const updatedAircraftList = await axios.post('http://localhost:8081/admin/getAircraftIDs');
      setAircraftList(updatedAircraftList.data.planes);

    } catch (error) {
      console.error('Error deleting Aircraft:', error);
      // Handle error and show an error message to the user
    }
  };

  return (
    <form className="flight-form" onSubmit={handleDelete} style={{ maxWidth: '400px', margin: 'auto', textAlign: 'left' }}>
      <div className="form-control" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
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

      <button type="submit" className="btn btn-success w-100" style={{ display: 'block', width: '100%' }}>
        Delete Aircraft
      </button>
    </form>
  );
};

export default DeleteAircraftForm;
