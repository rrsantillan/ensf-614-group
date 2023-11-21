import React, {useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';



function CurrentFlights(){
    const { username } = useParams();
    const [selectedFlightID, setSelectedFlightID] = useState(null);
   
    const [flightData, setFlightData] = useState(null);

    const [values, setValues] = useState({
        username: ''
    })
    
    const handleSumbit =(event)=> {
        setValues((prevValues) => ({
            username: username
        }));

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
        <div className="d-flex vh-100 justify-content-center align-items-top">
            <div className='p-3 bg-white w-75'>
                <h2>Current Flights</h2>
                
                <form action='' onSubmit={handleSumbit}>
                    <div className='mb-3'>
                        <label htmlFor="user"><strong> UserName </strong></label>
                        <p>{username}</p>
                        <div style ={{width: '10px'}}/>
                         <button type='submit' className='btn btn-success w-100'>Get Flights</button>
                    </div>
                </form>
            </div>
            {Array.isArray(flightData) && flightData.length > 0 && (
                <div>
                    <h3>Flight Details</h3>
                    {flightData.map((flight, index) => (
                        <div className="flight-data-container" key={index}>
                            <p>Departure: {flight.DEPARTURE}</p>
                            <p>Land: {flight.LANDING}</p>

                            <button onClick={() => {
                                setSelectedFlightID(flight.FLIGHTID)}}
                                className={selectedFlightID === flight.FLIGHTID ? 'selectedFlight' : ''}>
                                Set Flight ID
                            </button>
                            <p></p>
                        </div>
                    ))}
                   
                </div>
            )}
        </div>
    )
}
export default CurrentFlights