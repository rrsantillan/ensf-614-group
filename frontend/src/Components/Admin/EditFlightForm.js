// EidtFlightForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';




const EditFlightForm = () => {

  const [aircraftList, setAircraftList] = useState([]);

 const [aircraftid, setAircraftId] = useState('');
 const [destination, setDestination] = useState('');
 const [origin, setOrigin] = useState('');
 const [departureTime, setDepartureTime] = useState('');
 const [landingTime, setLandingTime] = useState('');
 const [flightData, setFlightData] = useState(null);
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



// populates list of flights matching criteria
 const handleSearch = (e) => {
   e.preventDefault(); // Prevent the default form submission behavior
   console.log(values)
   axios.post('http://localhost:8081/flight/checkFlights', values)
   .then((res) => {
        const fetchedFlightData = res.data.flights;
        console.log('fetchedFlightData:', fetchedFlightData);
        const fetchedFlightDataTimeFormatted = formatFlightTime(fetchedFlightData)
        setFlightData(fetchedFlightDataTimeFormatted);
        
   })
   .catch((err) => {
       console.error(err);
   });
  };




 /**
  * Populates the edit flight details base on selection
  * @param {*} flightid
  */
 const populateEditFields = (flightid) => {

   // flightID2 on the next line must be the same name in the post definition for /getFlightByFlightID
   // specifically the String that goes into db.query(sql, req.body.flightID2)
   const requestData = { flightID2: flightid }
   // console.log(FLIGHTID)
   axios.post('http://localhost:8081/admin/getFlightByFlightID', requestData)
     .then((res) => {
         const fetchedFlightData = res.data.flights;
         console.log('fetchedFlightData before setters:', fetchedFlightData);
         setFlightData(fetchedFlightData);
         
         setAircraftId(fetchedFlightData[0].AIRPLANEID)
         setDestination(fetchedFlightData[0].DESTINATION)
         setOrigin(fetchedFlightData[0].ORIGIN)
         setDepartureTime(formatDateString(fetchedFlightData[0].DEPARTURETIME))
         setLandingTime(formatDateString(fetchedFlightData[0].ARRIVALTIME))
         // console.log(fetchedFlightData.DESTINATION)
         console.log('fetchedFlightData[0].DESTINATION after setters:',fetchedFlightData[0].DESTINATION)
   
     })
     .catch((err) => {
         console.error(err);
     });
 }

 
const fetchAircraftList = async () => {
    try {
      const response = await axios.post('http://localhost:8081/admin/getAircraftIDs');
      console.log("Response from server:", response);
      setAircraftList(response.data.planes);
    } catch (error) {
      console.error('Error fetching aircraft list:', error);
    }
  };
 // popualtes aircraft dropdown list to validate aircraft is in fleet
 useEffect(() => {
  fetchAircraftList();
}, []);


 /**
  * Saves edit data and attempts INSERT
  * @param {*} FLIGHTID
  */
 const saveChangesToFlight = async (e) => {
   e.preventDefault(); // Prevent the default form submission behavior
   const requestData = { flightID: selectedFlightID,
                         aircraftid: aircraftid,
                         origin: origin,
                         destination: destination,
                         departureTime: departureTime,
                         landingTime: landingTime
    }
   // console.log(FLIGHTID)
   axios.post('http://localhost:8081/admin/overwriteFlightsByFlightID', requestData)
     .then((res) => {
         // no need to do anything here, just writing to the database
         if(res.data === "Success"){
          alert("Flight changes saved");
          fetchAircraftList();
         }else if (requestData.flightID === null){
           alert("Flight ID was empty.");
         }
         else {
           alert("Unable to edit flight.");
         }
         console.log(res)
     })
     .catch((err) => {
         console.error(err);
     });
   }


   /**
   * Deletes the selected Flight
   */
  const deleteFlight = async (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:8081/admin/deleteFlightByFlightId', {flightID: selectedFlightID})
      .then((res) => {
        if (res.data === "Success") {
          // Handle successful deletion, if needed
          setDestination("")
          setOrigin("")
          setDepartureTime(formatDateString(null))
          setLandingTime(formatDateString(null))
          alert("Flight deleted successfully.");
          fetchAircraftList();
        } else {
          alert("Unable to delete flight.");
        }
        // Reset the form fields and selectedCrewId after deletion
        
      })
      .catch((err) => {
        console.error(err);
      });
  };


  /**
    * Converts the date/time string into the required format of'YYYY-MM-DDTHH:mm:ss.SSS'
    * @param {*} dateString
    * @returns
    */
  const formatDateString = (dateString) => {
    const formattedDate = moment.utc(dateString).format('YYYY-MM-DDTHH:mm:ss.SSS');
    return formattedDate;
  };
 
  const formatFlightTime = (data) => {
    return data.map(flight => ({
      ...flight,
      DEPARTURETIME: moment.utc(flight.DEPARTURETIME).format('MMMM Do YYYY, h:mm a'),
      ARRIVALTIME: moment.utc(flight.ARRIVALTIME).format('MMMM Do YYYY, h:mm a')
    }));
  };

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
                      <div className='p-2 flight-details-container'>
                          {flightData.map((flight, index) => (
                              <div className="flight-data-container" key={index}>
                                    <p><strong>Origin:</strong> {flight.ORIGIN} <strong>Departure Time:</strong> {flight.DEPARTURETIME}</p>
                                    <p><strong>Destination:</strong> {flight.DESTINATION} <strong>Landing Time:</strong> {flight.ARRIVALTIME}</p>
                                  <button onClick={() => {
                                     
                                      setSelectedFlightID(flight.FLIGHTID)
                                      populateEditFields(flight.FLIGHTID);
                                      
                                      setDestination(flight.DESTINATION)
                                      setOrigin(flight.ORIGIN)
                                      setDepartureTime(formatDateString(flight.DEPARTURETIME))
                                      setLandingTime(formatDateString(flight.ARRIVALTIME))
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

   <div className='my-3'>
       <form className="flight-form" onSubmit={saveChangesToFlight} style={{ maxWidth: '400px', margin: 'auto', textAlign: 'left' }}>
           <h3>Edit Flight Details for FlightID: {selectedFlightID}</h3>


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

<div className="form-control" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
               <label style={{ marginBottom: '5px' }}>
               Source:
               </label>
               <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
           </div>


           <div className="form-control" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
               <label style={{ marginBottom: '5px' }}>
               Destination:
               </label>
               <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
           </div>


           <div className="form-control" style={{ marginBottom: '10px' }}>
               <label>
               Departure Time:
               <input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
               </label>
           </div>


           <div className="form-control" style={{ marginBottom: '10px' }}>
               <label>
               Landing Time:
               <input type="datetime-local" value={landingTime} onChange={(e) => setLandingTime(e.target.value)} />
               </label>
           </div>

           <button type='submit' className='btn btn-success w-100'>Save Changes to Flight</button>
           <button onClick={deleteFlight} className='btn btn-danger w-100' style={{ marginTop: '10px' }}>Delete Flight</button>
       </form>
     
   </div>
   </div>
 
 );
};




export default EditFlightForm;





