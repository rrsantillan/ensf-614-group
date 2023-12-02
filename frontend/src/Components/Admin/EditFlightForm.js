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
 const [selectedFlight, setSelectedFlight] = useState(null);
 const [selectedFlightID, setSelectedFlightID] = useState(null);
 const [flightID2, setFlightID] = useState(null);
 const [fetchedAssignedCrew, setFetchedAssignedCrew] = useState([]);




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




 /**
  * Populates the edit flight details base on selection
  * @param {*} FLIGHTID
  */
 const populateEditFields = (FLIGHTID) => {

   // flightID2 on the next line must be the same name in the post definition for /getFlightByFlightID
   // specifically the String that goes into db.query(sql, req.body.flightID2)
   const requestData = { flightID2: FLIGHTID }
   // console.log(FLIGHTID)
   axios.post('http://localhost:8081/getFlightByFlightID', requestData)
     .then((res) => {
         const fetchedFlightData = res.data.flights;
         console.log('fetchedFlightData before setters:', fetchedFlightData);
         setFlightData(fetchedFlightData);
         setFlightID(fetchedFlightData.flightID);
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

 // popualtes aircraft dropdown list to validate aircraft is in fleet
 useEffect(() => {
  const fetchAircraftList = async () => {
    try {
      const response = await axios.post('http://localhost:8081/getAircraftIDs');
      console.log("Response from server:", response);
      setAircraftList(response.data.planes);
    } catch (error) {
      console.error('Error fetching aircraft list:', error);
    }
  };
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
   axios.post('http://localhost:8081/overwriteFlightsByFlightID', requestData)
     .then((res) => {
         // no need to do anything here, just writing to the database
         if(res.data === "Success"){
           //navigate(`/home/${username}`);
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
  
    axios.post('http://localhost:8081/deleteFlightByFlightId', {flightID: selectedFlightID})
      .then((res) => {
        if (res.data === "Success") {
          // Handle successful deletion, if needed
          setDestination("")
          setOrigin("")
          setDepartureTime(formatDateString(null))
          setLandingTime(formatDateString(null))
          alert("Flight deleted successfully.");
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
                 
               )}




   <div>
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





