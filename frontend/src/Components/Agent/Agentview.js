import axios from 'axios'
import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header'; 
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


function Agentview(){
    const {Profile1, username } = useParams();
    const [selectedFlightID, setSelectedFlightID] = useState(null);
    const [flightData, setFlightData] = useState(null);

    const [fetchedRegisteredTickets, setFetchedRegisteredTickets] = useState([]);


    const handlePassSel = (FLIGHTID)=> {
    
        const requestData = { flightID2: FLIGHTID };

        axios.post('http://localhost:8081/agent/getRegTicket', requestData)
        .then((response) => { 
            const fetchedTickets = response.data.registeredTickets;
            setFetchedRegisteredTickets(fetchedTickets);
        })
        .catch((err) => {
            console.error(err);
        });
       
        
    };
 

    const handleSumbit = (event)=> {
        event.preventDefault();
        

        axios.post('http://localhost:8081/agent/getAllFlights')
        .then((res) => {
            const fetchedFlightData = res.data.flights;
            setFlightData(fetchedFlightData);
        })
        .catch((err) => {
            console.error(err);       
        });
      
    };
    return(
        
        <div className="p-0 container-fluid">
            <Header className="" Profile1={Profile1} username={username}/>{/* Assuming Header is your component for the header */}
            <div className="d-flex vh-90 justify-content-center align-items-top">
                <div className='p-3 bg-light w-75'>
                    <h2>Browse Flights</h2>
                    <form action='' onSubmit={handleSumbit}>
                        <button type='submit' className='btn btn-success w-100'>Get Flights</button>
                    </form>
                    {Array.isArray(flightData) && flightData.length > 0 && (
                        <div className="mt-5">
                            <h3>Flight Details</h3>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {flightData.map((flight, index) => (
                                    <div className="flight-data-container" key={index}>
                                        <p>Origin: {flight.ORIGIN} Departure Time: {flight.DEPARTURETIME}</p>
                                        <p>Destination: {flight.DESTINATION} Landing Time: {flight.ARRIVALTIME}</p>
                                        
                                        <button onClick={() => 
                                            {
                                            handlePassSel(flight.FLIGHTID);
                                            //setFlightID(flight.FLIGHTID);
                                            setSelectedFlightID(flight.FLIGHTID)}}
                                            className={selectedFlightID === flight.FLIGHTID ? 'selectedFlight' : "btn btn-outline-secondary"}>
                                            See Passenger List 
                                        </button>
                                        
                                </div>
                                
                                ))}  
                            </div>
                        </div>
                    )}
                    <div className="mt-5">
                        <h3>Registered Tickets</h3>
                        <ul>
                            {fetchedRegisteredTickets.map((ticket, index) => (
                                <li key={index}>{ticket.USERNAME}  {ticket.SEATNUMBER}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            
            </div>
        </div>
        

        
    )

}
export default Agentview