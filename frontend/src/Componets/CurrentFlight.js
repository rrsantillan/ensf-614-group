import React, {useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';



function CurrentFlights(){
    const { username } = useParams();
   
    const [flightData, setFlightData] = useState(null);

    const [values, setValues] = useState({
        username2: ''
    })

    const handleDeleteTicket = (SEATNUMBER, FLIGHTID) => {
       
        const updatedValues = {
            ...values,
            SEATNUMBER: SEATNUMBER,
            FLIGHTID: FLIGHTID,
        };

       

        axios.post('http://localhost:8081/deleteTicket', updatedValues)
        .then(() => {
            handleSumbit();
            window.location.reload();

        })
        .catch((err) => {
            console.error(err)
        })
        
        window.location.reload();


    };
    const handleSumbit = (event)=> {
        event.preventDefault();
        setValues((prevValues) => ({
            ...prevValues,
            username2: username
        }));

        axios.post('http://localhost:8081/getFlights', values)
        .then((res) => {
            console.log(username)
            const fetchedFlightData = res.data.flights;
            setFlightData(fetchedFlightData);
        })
        .catch((err) => {
            console.error(err);       
        });
      
    };

    return(
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
                <div>
                    <h3>Flight Details</h3>
                    {flightData.map((flight, index) => (
                        <div className="flight-data-container" key={index}>
                            <p>From {flight.SOURCE} to {flight.DESTINATION}</p>
                            <p>Departure: {flight.DEPARTURE}</p>
                            <p>Land: {flight.LANDING}</p>
                            <p>Seat: {flight.SEATNUMBER}</p>
                              <button onClick={() => handleDeleteTicket(flight.SEATNUMBER, flight.FLIGHTID)}>Delete Ticket</button>
                        </div>
                    ))}
                   
                </div>
            )}
        </div>
    )
}
export default CurrentFlights