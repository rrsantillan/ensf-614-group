import axios from 'axios'
import React, {useState} from 'react'
import {  } from 'react-router-dom';


function Agentview(){
    const [selectedFlightID, setSelectedFlightID] = useState(null);
    //const [flightID2, setFlightID] = useState(null);
    const [flightData, setFlightData] = useState(null);

    const [fetchedRegisteredTickets, setFetchedRegisteredTickets] = useState([]);


    const handlePassSel = (FLIGHTID)=> {
    
        const requestData = { flightID2: FLIGHTID };

        axios.post('http://localhost:8081/getRegTicket', requestData)
        .then((response) => {  // Change 'res' to 'response' or any other variable name you prefer
            const fetchedTickets = response.data.registeredTickets;
            setFetchedRegisteredTickets(fetchedTickets);
        })
        .catch((err) => {
            console.error(err);
        });
       
        
    };
 

    const handleSumbit = (event)=> {
        event.preventDefault();
        

        axios.post('http://localhost:8081/getAllFlights')
        .then((res) => {
            const fetchedFlightData = res.data.flights;
            setFlightData(fetchedFlightData);
        })
        .catch((err) => {
            console.error(err);       
        });
      
    };
    return(
        <div className="d-flex vh-100 justify-content-center align-items-top">
            <div className='p-3 bg-white w-75'>
                <h2>Where To?</h2>
                <form action='' onSubmit={handleSumbit}>
                    <button type='submit' className='btn btn-success w-100'>Get Flights</button>
                </form>
                {Array.isArray(flightData) && flightData.length > 0 && (
                    <div>
                        <h3>Flight Details</h3>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {flightData.map((flight, index) => (
                            <div className="flight-data-container d-flex justify-content-between mb-3" key={index}>
        
                                    <p>Source: {flight.SOURCE}</p><p> Destination: {flight.DESTINATION}</p>
                                    <p>Flight ID: {flight.FLIGHTID} 
                                    <button onClick={() => 
                                        {
                                        handlePassSel(flight.FLIGHTID);
                                        //setFlightID(flight.FLIGHTID);
                                        setSelectedFlightID(flight.FLIGHTID)}}
                                        className={selectedFlightID === flight.FLIGHTID ? 'selectedFlight' : "btn btn-outline-secondary"}>
                                        See Passengar List 
                                    </button>
                                    </p>
                                </div>
                               
                            ))}  
                        </div>
                    </div>
                )}
                <h3>Registered Tickets</h3>
                <ul>
                    {fetchedRegisteredTickets.map((ticket, index) => (
                        <li key={index}>{ticket.USERNAME}  {ticket.SEATNUMBER}</li>
                    ))}
                </ul>
            </div>
           
        </div>
        

        
    )

}
export default Agentview