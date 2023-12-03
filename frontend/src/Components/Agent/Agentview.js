import axios from 'axios'
import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header'; 
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import moment from 'moment'


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
    
    // const formattedDate = moment.utc(flight.DEPARTURETIME).format('YYYY-MM-DDTHH:mm:ss.SSS')
    // moment().format('MMMM Do YYYY, h:mm:ss a')

    const formatFlightTime = (data) => {
        return data.map(flight => ({
          ...flight,
          DEPARTURETIME: moment.utc(flight.DEPARTURETIME).format('MMMM Do YYYY, h:mm a'),
          ARRIVALTIME: moment.utc(flight.ARRIVALTIME).format('MMMM Do YYYY, h:mm a')
        }));
    };

    const handleSumbit = (event)=> {
        event.preventDefault();
        

        axios.post('http://localhost:8081/agent/getAllFlights')
        .then((res) => {
            const fetchedFlightData = res.data.flights;
            const fetchedFlightDataTimeFormatted = formatFlightTime(fetchedFlightData)
            setFlightData(fetchedFlightDataTimeFormatted);
        })
        .catch((err) => {
            console.error(err);       
        });
      
    };
    return(
        
        <div className="p-0 container-fluid">
            <Header className="" Profile1={Profile1} username={username}/>{/* Assuming Header is your component for the header */}
            <div className="my-3 d-flex vh-90 justify-content-center align-items-top">
                <div className='p-3 bg-light w-75'>
                    <h2>See passenger lists:</h2>
                    <form action='' onSubmit={handleSumbit}>
                        <button type='submit' className='btn btn-success w-100'>Show all flights</button>
                    </form>
                    {Array.isArray(flightData) && flightData.length > 0 && (
                        <div className="mt-5">
                            <h3>Flight Details</h3>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {flightData.map((flight, index) => (
                                    <div className="flight-data-container" key={index}>
                                        <p><strong>Origin:</strong> {flight.ORIGIN} <strong>Departure Time:</strong> {flight.DEPARTURETIME}</p>
                                        <p><strong>Destination:</strong> {flight.DESTINATION} <strong>Landing Time:</strong> {flight.ARRIVALTIME}</p>
                                        
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