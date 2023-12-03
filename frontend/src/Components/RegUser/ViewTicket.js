import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Header';

function CurrentFlights() {
  const { username } = useParams();
  const [values] = useState({
    username: username || '', // Set default value to empty string
  });
  const [guestEmail, setGuestEmail] = useState('');
  const [flightData, setFlightData] = useState(null);

  useEffect(() => {
    console.log("useEffect ran");

    if (values.username !== 'guest') {
      axios.post('http://localhost:8081/reguser/getUserProfile', { user: values.username })
        .then(res => {
          console.log(res.data.user[0].EMAIL);
          if (res.data.user && res.data.user[0]) {
            setGuestEmail(res.data.user[0].EMAIL);
          } else {
            console.error("User data is undefined or empty.");
          }
        })
        .catch(error => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [values.username, setGuestEmail]);

  useEffect(() => {
    console.log("Guest Email:", guestEmail);
  }, [guestEmail]); // Log guestEmail whenever it changes

  const getEmailBody = useCallback((seatNumber, flightId) => {
    if (!flightData) {
      console.log('Flight data not available:', flightData);
      return 'Flight details not available.';
    }

    return `
      Hello ${values.username},
  
      Cancellation confirmed for your flight. Please see details below:
  
      Flight Details:
      Origin: ${flightData[0].ORIGIN} Departure Time: ${flightData[0].DEPARTURETIME}
      Destination: ${flightData[0].DESTINATION} Arrival Time: ${flightData[0].ARRIVALTIME}
        
      Regards,
      Oceanic Airlines!
    `;
  }, [flightData, values.username]);
  
  
  
  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:7002/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: guestEmail,
          subject: 'Ticket Cancellation',
          body: getEmailBody(),
        }),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleDeleteTicket = async (SEATNUMBER, FLIGHTID) => {
    const updatedValues = {
      ...values,
      SEATNUMBER: SEATNUMBER,
      FLIGHTID: FLIGHTID,
    };

    setGuestEmail(prevGuestEmail => prevGuestEmail || '');
    
    await sendEmail();

    try {
      await axios.post('http://localhost:8081/reguser/deleteTicket', updatedValues);
      handleSumbit2();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSumbit2 = async () => {
    try {
      const res = await axios.post('http://localhost:8081/reguser/getFlights', values);
      const fetchedFlightData = res.data.flights;
      setFlightData(fetchedFlightData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    handleSumbit2();
  };

  return (
    <div className="d-flex flex-column">
      <div className="p-3 bg-green">
        <Header />
      </div>
      <div className="flex-column vh-100 justify-content-center align-items-top">
        <div className='p-3 bg-white w-75'>
          <h2>Current Flights</h2>
          <form action='' onSubmit={handleSumbit} className="d-flex flex-column">
            <div className='mb-3 d-flex align-items-baseline '>
              <label htmlFor="user"><strong>User: </strong></label>
              <p className="ml-2 px-2">{username}</p>
            </div>
            <div className="mb-3">
              <button type='submit' className='btn btn-success'>Retrieve Flights</button>
            </div>
          </form>
        </div>
        {Array.isArray(flightData) && flightData.length > 0 && (
          <div className="flight-details-container">
            <h3>Flight Details</h3>
            <div className="scrollable-flight-details">
              {flightData.map((flight, index) => (
                <div className="flight-data-container" key={index}>
                  <p>Origin: {flight.ORIGIN} Departure Time: {flight.DEPARTURETIME}</p>
                  <p>Destination: {flight.DESTINATION} Landing Time: {flight.ARRIVALTIME}</p>
                  <p>Seat Style: {flight.SEATTYPE} Seat: {flight.SEATNUMBER}</p>
                  <button onClick={() => handleDeleteTicket(flight.SEATNUMBER, flight.FLIGHTID)}>Delete Ticket</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentFlights;