// FlightForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditFlightForm = () => {
  const [dataToPopulateWith, setPopulateData] = useState({
    Source: '',
    Dest: '',
    Departure: '',
    Landing: '',
  })

  const [destination, setDestination] = useState('');
  const [source, setSource] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [landingTime, setLandingTime] = useState('');

  const [flightData, setFlightData] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedFlightID, setSelectedFlightID] = useState(null);
  const [flightID2, setFlightID] = useState(null);
  const [fetchedAssignedCrew, setFetchedAssignedCrew] = useState([]);

  const [values, setValues] = useState({
    Source: '',
    Dest: ''
})


const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({
    ...values,
    [name]: value,
    });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an API request to your backend to add the flight to the database
    try {
      axios.post('http://localhost:8081/checkFlights', {
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

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(values)
    axios.post('http://localhost:8081/checkFlights', values)
    .then((res) => {
        const fetchedFlightData = res.data.flights;
        console.log('fetchedFlightData:', fetchedFlightData);
        setFlightData(fetchedFlightData);
        setFlightID(fetchedFlightData.flightID);

    })
    .catch((err) => {
        console.error(err);
    });
  
};
const populateEditFields = (FLIGHTID) => {


  const requestData = { flightID2: FLIGHTID }
  // console.log(FLIGHTID)
  axios.post('http://localhost:8081/getFlightByFlightID', requestData)
    .then((res) => {
        const fetchedFlightData = res.data.flights;
        console.log('fetchedFlightData:', fetchedFlightData);
        setFlightData(fetchedFlightData);
        setFlightID(fetchedFlightData.flightID);
        setDestination(fetchedFlightData[0].DESTINATION)
        setSource(fetchedFlightData[0].SOURCE)
        setDepartureTime(fetchedFlightData[0].DEPARTURE)
        setLandingTime(fetchedFlightData[0].LANDING)
        console.log(fetchedFlightData.DESTINATION)
        // setPopulateData(prevState => ({
        //   ...prevState,
        //   [dataToPopulateWith.Source]: fetchedFlightData[0].SOURCE,
        //   [dataToPopulateWith.Dest]: fetchedFlightData[0].DESTINATION,
        //   [dataToPopulateWith.Departure]: fetchedFlightData[0].DEPARTURE,
        //   [dataToPopulateWith.Landing]: fetchedFlightData[0].LANDING
        // }));
    // console.log(dataToPopulateWith.Source)
    console.log(fetchedFlightData[0].DESTINATION)
    
    })
    .catch((err) => {
        console.error(err);
    });
}

  return (
    <div>
        <form action='' onSubmit={handleSearch}>
                    <div>
                        <input type="text" placeholder='From...' name = 'Source'
                        onChange={handleInput} className='form-control'/>
                        
                    </div>
                    <div>
                        <input type="text" placeholder='To...' name = 'Dest'
                        onChange={handleInput} className='form-control'/>
                      
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Search Flights</button>
                </form>
                {Array.isArray(flightData) && flightData.length > 0 && (
                    <div className="flight-details-container">
                        <h3>Flight Details</h3>
                        {flightData.map((flight, index) => (
                            <div className="flight-data-container" key={index}>
                                <p>Departure: {flight.SOURCE}, {flight.DEPARTURE}</p>
                                <p>Land: {flight.DESTINATION}, {flight.LANDING}</p>

                                <button onClick={() => {
                                    setFlightID(flight.FLIGHTID);
                                    setSelectedFlightID(flight.FLIGHTID)
                                    // fetchFlight(flight.FLIGHTID);
                                    populateEditFields(flight.FLIGHTID);
                                    }}
                                    
                                    className={selectedFlightID === flight.FLIGHTID ? 'selectedFlight' : ''}>
                                    Set Flight
                                </button>
                                <p></p>
                            </div>
                        ))}     
                    </div>
                    
                )}

    <div>
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

            <button type='submit' className='btn btn-success w-100'>Save Changes to Flight</button>
        </form>
        
    </div>
    </div>
    
  );
};

export default EditFlightForm;