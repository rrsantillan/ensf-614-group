import React from "react"
import axios from 'axios'
import  { useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
//import Calendar from 'react-calendar'

import '../CSS/styles.css';

function FindFlight(){
    const { username } = useParams();
    const [selectedFlightID, setSelectedFlightID] = useState(null);
    const [flightID2, setFlightID] = useState(null);

    const [values, setValues] = useState({
        Source: '',
        Dest: ''
    })

    const [flightData, setFlightData] = useState(null);


    const [errors, setErrors] = useState({})
        
    // const [dateRange, setDateRange] = useState({
    //     start: null,
    //     end: null,
    //   });
    
    // const handleDateChange = (date) => {
    //     // If start date is not selected, set it as the start date
    //     if (!dateRange.start) {
    //     setDateRange({ start: date, end: null });
    //     }
    //     // If start date is already selected and end date is not selected, set it as the end date
    //     else if (dateRange.start && !dateRange.end) {
    //     setDateRange({ ...dateRange, end: date });
    //     }
    //     // If both start and end dates are selected, reset the range
    //     else {
    //     setDateRange({ start: date, end: null });
    //     }
    // };
    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues({
        ...values,
        [name]: value,
        });
    };

    const handleSumbit =(event)=> {
        event.preventDefault();

        if (values.Source === '') {
            setErrors({
                ...errors,
                Source: 'Source should not be empty',
            });
            return;
        }
    
        if (values.Dest === '') {
            setErrors({
                ...errors,
                Dest: 'Destination should not be empty',
            });
            return;
        }
        // Clear previous errors
        setErrors({
            Source: '',
            Dest: '',
        });
        
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
 

return(
    <div className="d-flex vh-100 justify-content-center align-items-top">
        <div className='p-3 bg-white w-75'>
            <h2>Where To?</h2>
            <form action='' onSubmit={handleSumbit}>
                <div>
                    <input type="text" placeholder='From...' name = 'Source'
                    onChange={handleInput} className='form-control'/>
                    {errors.Source && <span className='text-danger'> {errors.Source} </span>}
                </div>
                <div>
                    <input type="text" placeholder='To...' name = 'Dest'
                    onChange={handleInput} className='form-control'/>
                    {errors.Dest && <span className='text-danger'> {errors.Dest} </span>}
                </div>
                {/* <Calendar
                    onChange={handleDateChange}
                    value={dateRange.start || dateRange.end}
                    selectRange={true}
                    tileContent={({ date, view }) => {
                    if (view === 'month') {
                        // Highlight the selected date range
                        if (
                        dateRange.start &&
                        dateRange.end &&
                        date >= dateRange.start &&
                        date <= dateRange.end
                        ) {
                        return <div className="selected-range"></div>;
                        }
                        // Highlight the selected start date
                        else if ( dateRange.start &&
                            dateRange.end === null &&
                            date.getTime() === dateRange.start.getTime()) {
                        return <div className="selected-start"></div>;
                        }
                    }
                    }}
                /> */}
                <button type='submit' className='btn btn-success w-100'>Search Flights</button>


            </form>
            {Array.isArray(flightData) && flightData.length > 0 && (
                <div>
                    <h3>Flight Details</h3>
                    {flightData.map((flight, index) => (
                        <div className="flight-data-container" key={index}>
                            <p>Departure: {flight.DEPARTURE}</p>
                            <p>Land: {flight.LANDING}</p>

                            <button onClick={() => {
                                setFlightID(flight.FLIGHTID);
                                setSelectedFlightID(flight.FLIGHTID)}}
                                className={selectedFlightID === flight.FLIGHTID ? 'selectedFlight' : ''}>
                                Set Flight ID
                            </button>
                            <p></p>
                        </div>
                    ))}
                    <h2>Book Flight</h2>
                    <Link to={`../BookFlight/${username}/${flightID2}`} className='btn btn-default border w-100 bg-light'> BookFlight </Link>
                            
                </div>
                
            )}
        </div>


    </div>
      

      
  )

}
export default FindFlight