import React, {useState} from 'react'
import axios from 'axios'


function EditCrewAssignments(){
    
   
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
  
    const handleFlightSelection = (flight) => {
        setSelectedFlight(flight);
        // If you want to load the selected flight's crew members for editing, you can do that here.
        // For simplicity, I'm resetting  the crew selection for demonstration purposes.
        setSelectedCrew([]);
    };

    
    const handleSubmitCrewAssignment = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      updateCrew(flightID2);
    }; 

    const [allCrew, setAllCrew] = useState([
       ]);
    const [selectedCrew, setSelectedCrew] = useState([]);


    const onSelectCrew = (crew) => {
        setAllCrew((prevAllCrew) => prevAllCrew.filter((c) => c.CREWID !== crew.CREWID));
        setSelectedCrew((prevSelectedCrew) => [...prevSelectedCrew, crew]);
      };
    
      const onRemoveCrew = (crew) => {
        setSelectedCrew((prevSelectedCrew) => prevSelectedCrew.filter((c) => c.CREWID !== crew.CREWID));
        setAllCrew((prevAllCrew) => [...prevAllCrew, crew]);
      };

    const fetchCrew = (FLIGHTID) => {
        axios.post('http://localhost:8081/getCrew')
        .then((res) => {
            const fetchedCrewArray = res.data.crew;
            const fetchedCrew = fetchedCrewArray.map(crew => ({ CREWID: crew.CREWID, FNAME: crew.FNAME }));
            console.log(fetchedCrew);
            setAllCrew(fetchedCrew);
        })
        .catch((err) => {
            console.error(err);
        });

        axios.post('http://localhost:8081/getAssignedCrew', { FLIGHTID })
        .then((res) => {
            const fetchedAssignedCrewArray = res.data.crew;
            console.log('Assigned Crew:', fetchedAssignedCrewArray);
            setFetchedAssignedCrew(fetchedAssignedCrewArray.map(crew => ({ CREWID: crew.CREWID, FNAME: crew.FNAME })));
            setSelectedCrew(fetchedAssignedCrewArray.map(crew => ({ CREWID: crew.CREWID, FNAME: crew.FNAME })));
          })
          .catch((err) => {
            console.error(err);
          });

    }
    const updateCrew = async (FLIGHTID) => {
        try {
            console.log('Selected Crew:', selectedCrew);

            const updatedCrew = selectedCrew.map(crew => ({ CREWID: crew.CREWID, FNAME: crew.FNAME }));
            console.log('Updated Crew:', updatedCrew);

          await axios.post('http://localhost:8081/updateCrew', { FLIGHTID, updatedCrew });
      
          
      
          console.log('Crew updated successfully.');
        } catch (error) {
          console.error('Error updating crew:', error);
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

    
    return (
      <div>
          <form action='' onSubmit={handleSearch}>
                      <div>
                          <input type="text" placeholder='From...' name = 'Origin'
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
                                  <p>Departure: {flight.ORIGIN}, {flight.DEPARTURETIME}</p>
                                  <p>Land: {flight.DESTINATION}, {flight.ARRIVALTIME}</p>

                                  <button onClick={() => {
                                      handleFlightSelection(flight.flightID)
                                      setSelectedFlightID(flight.FLIGHTID)
                                      setFlightData(flight)
                                      }}
                                    
                                      className={selectedFlightID === flight.FLIGHTID ? 'selectedFlight' : ''}>
                                      Set Flight
                                  </button>
                                  <p></p>
                              </div>
                          ))}    
                      </div>
                    
                  )}
                  
               

      </div>
    
    );
   };



export default EditCrewAssignments;
