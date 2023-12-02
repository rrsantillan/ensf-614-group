import React, {useState} from 'react'

import CrewEditor from './CrewEditor';

import axios from 'axios'


function EditCrewAssignments(){
    //const { username } = useParams();
    const [activeTab, setActiveTab] = useState('browse'); 

    const [flightData, setFlightData] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedFlightID, setSelectedFlightID] = useState(null);
    const [flightID2, setFlightID] = useState(null);
    const [fetchedAssignedCrew, setFetchedAssignedCrew] = useState([]);

    //for add aircraft
    const [selectedAircraft, setSelectedAircarft] = useState([]);

    //for add new crew
    const [selectedNewCrew, setSelectedNewCrewTab] = useState([]);

    

    const [values, setValues] = useState({
        Origin: '',
        Dest: ''
    })
    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues({
        ...values,
        [name]: value,
        });
    };
  
    
    const handleSubmitCrewAssignment = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      updateCrew(selectedFlightID);
    }; 

    const [allCrew, setAllCrew] = useState([
       ]);
    const [selectedCrew, setSelectedCrew] = useState([]);


    const onSelectCrew = (crew) => {
      //console.log('Selecting Crew:', crew);
      setAllCrew((prevAllCrew) => {
          const filteredCrew = prevAllCrew.filter((c) => c.CREWID !== crew.CREWID);
          //console.log('Filtered All Crew:', filteredCrew);
          return filteredCrew;
      });
      setSelectedCrew((prevSelectedCrew) => {
          const updatedSelectedCrew = [...prevSelectedCrew, crew];
          //console.log('Updated Selected Crew:', updatedSelectedCrew);
          return updatedSelectedCrew;
      });
    };
    
    const onRemoveCrew = (crew) => {
      //console.log('Removing Crew:', crew);
      setSelectedCrew((prevSelectedCrew) => {
          const filteredSelectedCrew = prevSelectedCrew.filter((c) => c.CREWID !== crew.CREWID);
          //console.log('Filtered Selected Crew:', filteredSelectedCrew);
          return filteredSelectedCrew;
      });
      setAllCrew((prevAllCrew) => {
          const updatedAllCrew = [...prevAllCrew, crew];
          //console.log('Updated All Crew:', updatedAllCrew);
          return updatedAllCrew;
      });
    };

    const fetchCrew =  async (selectedFlightID) => {
      //console.log('Initial All Crew:', allCrew);
      try {  

        const crewResponse = await axios.post('http://localhost:8081/getCrew');
        const fetchedCrewArray = crewResponse.data.crew;
        const fetchedCrew = fetchedCrewArray.map(crew => ({ CREWID: crew.CREWID, FNAME: crew.FNAME }));
        //console.log(fetchedCrew);
        setAllCrew(fetchedCrew);

        // Fetch assigned crew members for the selected flight
        const assignedCrewResponse = await axios.post('http://localhost:8081/getAssignedCrew', { selectedFlightID });
        //console.log('Server Response:', assignedCrewResponse);
        const fetchedAssignedCrewArray = assignedCrewResponse.data.crew;
        //console.log('Assigned Crew:', fetchedAssignedCrewArray);
          
         // Update the states
         // Update the states
        setAllCrew((prevAllCrew) => {
          const updatedAllCrew = prevAllCrew.filter((c) => !fetchedAssignedCrewArray.some((assigned) => assigned.CREWID === c.CREWID));
          //console.log('Updated All Crew:', updatedAllCrew);
          return updatedAllCrew;
        });
         setFetchedAssignedCrew(fetchedAssignedCrewArray.map(crew => ({ CREWID: crew.CREWID, FNAME: crew.FNAME })));
         setSelectedCrew(fetchedAssignedCrewArray.map(crew => ({ CREWID: crew.CREWID, FNAME: crew.FNAME })));

         //console.log('All Crew after fetching:', allCrew);
         //console.log('Assigned Crew after fetching:', fetchedAssignedCrewArray);

        } catch (err) {
            console.error(err);
        }


    }
    const updateCrew = async (selectedFlightID) => {
      try {
          //console.log('Selected Flight ID:', selectedFlightID);
          //console.log('Selected Crew:', selectedCrew);
  
          const updatedCrew = selectedCrew.map(crew => ({ CREWID: crew.CREWID, FNAME: crew.FNAME }));
          //console.log('Updated Crew:', updatedCrew);
  
          await axios.post('http://localhost:8081/updateCrew', { selectedFlightID, updatedCrew });
          
          //console.log('Crew updated successfully.');
      } catch (err) {
          console.error('Error updating crew:', err);
      }
    };
      
     
     

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        //console.log(values)
        axios.post('http://localhost:8081/checkFlights', values)
        .then((res) => {
            const fetchedFlightData = res.data.flights;
            //console.log('fetchedFlightData:', fetchedFlightData);
            setFlightData(fetchedFlightData);
            setFlightID(fetchedFlightData.flightID);
    
        })
        .catch((err) => {
            console.error(err);
        });
      
    };

    const renderContent = () => {
        switch (activeTab) {
          

          case 'browse':
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
                                    setFlightID(flight.FLIGHTID);
                                    setSelectedFlightID(flight.FLIGHTID)
                                    fetchCrew(flight.FLIGHTID);
                                    }}
                                    
                                    className={selectedFlightID === flight.FLIGHTID ? 'selectedFlight' : ''}>
                                    Set Flight
                                </button>
                                <p></p>
                            </div>
                        ))}     
                    </div>
                )}
    
                <div style={{ marginTop: '20px' }}>
                   <h1>{selectedFlight ? 'Edit Crew' : 'Assign Crew'}</h1>
                   <CrewEditor
                     allCrew={allCrew}
                     selectedCrew={selectedCrew}
                     onSelectCrew={onSelectCrew}
                     onRemoveCrew={onRemoveCrew}/>
                   <form className="flight-form" onSubmit={handleSubmitCrewAssignment} style={{ maxWidth: '400px', margin: 'auto', textAlign: 'left' }}>
                     <button type='submit' className='btn btn-success w-100'>Update Crew</button>
                   </form>
               </div>
              </div>
            );
          default:
            return null;
        }
      };
    
    return(
     <div className="container mt-4">
        <div className="mb-4">
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'browse' ? 'active' : ''}`} onClick={() => setActiveTab('browse')}>Edit Crew Flight Assigments</button>
            </li>
           
            </ul>
      </div>

      {renderContent()}
    </div>
    );
};

export default EditCrewAssignments;