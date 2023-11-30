import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import CrewEditor from './CrewEditor';
import FlightForm from './FlightForm';
import AddAircraftForm from './AddAircraftForm';
import AddCrewForm from './AddCrewForm';
import axios from 'axios'
import EditFlightForm from './EditFlightForm';

function AdminView(){
    //const { username } = useParams();
    const [activeTab, setActiveTab] = useState('create'); // 'create' or 'browse'

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
        // For simplicity, I'm resetting the crew selection for demonstration purposes.
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

    const renderContent = () => {
        switch (activeTab) {
          case 'create':
            return (
              <div>
                <h1>{selectedFlight ? 'Edit Flight' : 'Create Flight'}</h1>
                <FlightForm selectedFlight={selectedFlight} />
              </div>
            );
          case 'addAircraft':
            return (
              <div>
                <h1>Add Aircraft</h1>
                <AddAircraftForm selectedAircraft={selectedAircraft} />
              </div>
            );

          case 'edit-flight':
           return (
             <div>
               <h1>Edit Flight</h1>
               <EditFlightForm selectedFlight={selectedFlight} />
             </div>
             );

            case 'addNewCrew':
              return (
                <div>
                  <h1>Add Crew</h1>
                  <AddCrewForm selectedCrew={selectedNewCrew} />
                </div>
              );

          case 'browse':
            return (
              <div>
                <h1>Crew Assignment: Select Flight</h1>
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
                                <p>Departure: {flight.DEPARTURE}</p>
                                <p>Land: {flight.LANDING}</p>

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
                <button className={`nav-link ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')}>Create Flight</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'browse' ? 'active' : ''}`} onClick={() => setActiveTab('browse')}>Edit Crew Flight Assigments</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'addAircraft' ? 'active' : ''}`} onClick={() => setActiveTab('addAircraft')}>Add New Aircraft</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'addNewCrew' ? 'active' : ''}`} onClick={() => setActiveTab('addNewCrew')}>Add New Crew Member</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'edit-flight' ? 'active' : ''}`} onClick={() => setActiveTab('edit-flight')}>Edit Flights</button>
            </li>
            </ul>
      </div>

      {renderContent()}
    </div>
    );
};

export default AdminView;
