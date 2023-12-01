import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Header from './Header';


function CurrentFlights(){
    
    const [flightData, setFlightData] = useState(null);
    
    const { username } = useParams();
    const [values, setValues] = useState({
        username: ''
    })

    useEffect(() => {
        setValues({ username });
    }, [username]);
    

    const handleDeleteTicket = (SEATNUMBER, FLIGHTID) => {
       
        const updatedValues = {
            ...values,
            SEATNUMBER: SEATNUMBER,
            FLIGHTID: FLIGHTID,
        };

       

        axios.post('http://localhost:8081/deleteTicket', updatedValues)
        .then(() => {
          
            
            handleSumbit2();

        })
        .catch((err) => {
            console.error(err)
        })
        
      


    };
    const handleSumbit2 = ()=> {
        

        axios.post('http://localhost:8081/getFlights', values)
        .then((res) => {
            
            const fetchedFlightData = res.data.flights;
            setFlightData(fetchedFlightData);
        })
        .catch((err) => {
            console.error(err);       
        });
      
    };
    const handleSumbit = (event)=> {
        event.preventDefault();
        

        axios.post('http://localhost:8081/getFlights', values)
        .then((res) => {
            
            const fetchedFlightData = res.data.flights;
            setFlightData(fetchedFlightData);
        })
        .catch((err) => {
            console.error(err);       
        });
      
    };

    return(
        <div className="d-flex flex-column">
            <div className="p-3 bg-green">
                <Header />
            </div>
            <div className="flex-column vh-100 justify-content-center align-items-top">
                <div className='p-3 bg-white w-75'>
                    <h2>Current Flights</h2>
                    
                    <form action='' onSubmit={handleSumbit} className="d-flex flex-column">
                        <div className='mb-3 d-flex align-items-baseline '>
                            <label htmlFor="user"><strong>User: </strong></label>
                            <p className="ml-2 px-2" >{username}</p>
                        </div>
                        <div className="mb-3">
                            <button type='submit' className='btn btn-success'>Retrieve Flights</button>
                        </div>
                    </form>
                        
                </div>
                {Array.isArray(flightData) && flightData.length > 0 && (
                    <div className="flight-details-container">
                        <h3>Flight Details</h3>
                        <div className="scrollable-flight-details">
                        {flightData.map((flight, index) => (
                            <div className="flight-data-container" key={index}>
                            <p>Origin: {flight.ORIGIN} Departure Time: {flight.DEPARTURETIME}</p>
                            <p>Destination: {flight.DESTINATION} Landing Time: {flight.ARRIVALTIME}</p>
                            <p>Seat Stlye: {flight.SEATTYPE} Seat: {flight.SEATNUMBER}</p>
                            <button onClick={() => handleDeleteTicket(flight.SEATNUMBER, flight.FLIGHTID)}>Delete Ticket</button>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default CurrentFlights