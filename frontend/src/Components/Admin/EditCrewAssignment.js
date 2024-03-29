import React, {useState} from 'react'

import CrewEditor from './CrewEditor';

import axios from 'axios'


function EditCrewAssignments(){
    //const { username } = useParams();
    const [activeTab] = useState('browse'); 

    const [flightData, setFlightData] = useState(null);
    const [selectedFlight] = useState(null);
    const [selectedFlightID, setSelectedFlightID] = useState(null);
    
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
      e.preventDefault(); 
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

        const crewResponse = await axios.post('http://localhost:8081/admin/getCrew');
        const fetchedCrewArray = crewResponse.data.crew;
        const fetchedCrew = fetchedCrewArray.map(crew => ({ CREWID: crew.CREWID, FNAME: crew.FNAME }));
        //console.log(fetchedCrew);
        setAllCrew(fetchedCrew);

        // Fetch assigned crew members for the selected flight
        const assignedCrewResponse = await axios.post('http://localhost:8081/admin/getAssignedCrew', { selectedFlightID });
        //console.log('Server Response:', assignedCrewResponse);
        const fetchedAssignedCrewArray = assignedCrewResponse.data.crew;
        //console.log('Assigned Crew:', fetchedAssignedCrewArray);
          
        setAllCrew((prevAllCrew) => {
          const updatedAllCrew = prevAllCrew.filter((c) => !fetchedAssignedCrewArray.some((assigned) => assigned.CREWID === c.CREWID));
          //console.log('Updated All Crew:', updatedAllCrew);
          return updatedAllCrew;
        });
        
         setSelectedCrew(fetchedAssignedCrewArray.map(crew => ({ CREWID: crew.CREWID, FNAME: crew.FNAME })));

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
  
          await axios.post('http://localhost:8081/admin/updateCrew', { selectedFlightID, updatedCrew });
          
          //console.log('Crew updated successfully.');
          alert("Crew updated");
      } catch (err) {
          console.error('Error updating crew:', err);
      }
    };
      
     
     

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        //console.log(values)
        axios.post('http://localhost:8081/flight/checkFlights', values)
        .then((res) => {
            const fetchedFlightData = res.data.flights;
            //console.log('fetchedFlightData:', fetchedFlightData);
            setFlightData(fetchedFlightData);
           
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
                        <input type="text" placeholder='From' name = 'Origin'
                        onChange={handleInput} className='form-control'/>
                    </div>
                    <p></p>
                    <div>
                        <input type="text" placeholder='To' name = 'Dest'
                        onChange={handleInput} className='form-control'/>
                    </div>
                    <p></p>
                    <button type='submit' className='btn btn-success w-100'>Search Flights</button>
                </form>
                {Array.isArray(flightData) && flightData.length > 0 && (
                      <div className="mt-3 p-2 border">
                        <h3>Flight Details</h3>
                        <div className="p-2 flight-details-container">
                              {flightData.map((flight, index) => (
                                  <div className="flight-data-container" key={index}>
                                          <p><strong>Origin:</strong> {flight.ORIGIN} <strong>Departure Time:</strong> {flight.DEPARTURETIME}</p>
                                          <p><strong>Destination:</strong> {flight.DESTINATION} <strong>Landing Time:</strong> {flight.ARRIVALTIME}</p>

                                      <button onClick={() => {
                                         
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
          

      {renderContent()}
    </div>
    );
};

export default EditCrewAssignments;