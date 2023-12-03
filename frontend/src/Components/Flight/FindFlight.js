import React from "react"
import axios from 'axios'
import  { useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import Header from '../Header'; 
import 'react-calendar/dist/Calendar.css';
import '../../CSS/styles.css';

// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

function FindFlight(){
    const { Profile1, username } = useParams();
    const [selectedFlightID, setSelectedFlightID] = useState(null);
    const [flightID2, setFlightID] = useState(null);

    const [values, setValues] = useState({
        Origin: '',
        Dest: ''
    })

    const [flightData, setFlightData] = useState(null);


    const [errors, setErrors] = useState({})
        
    const [dateRange, setDateRange] = useState({
        start: null,
        end: null,
      });
    
  
    const handleDateChange = (date) => {
        // If start date is not selected, set it as the start date
        if (!dateRange.start) {
        setDateRange({ start: date, end: null });
        }
        // If start date is already selected and end date is not selected, set it as the end date
        else if (dateRange.start && !dateRange.end) {
        setDateRange({ ...dateRange, end: date });
        }
        // If both start and end dates are selected, reset the range
        else {
        setDateRange({ start: date, end: null });
        }
    };
    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues({
        ...values,
        [name]: value,
        });
    };

    const handleSumbit =(event)=> {
        event.preventDefault();
        console.log(event.target.ORIGIN);
        setErrors({
            Origin: '',
            Dest: '',
        });
        if (values.Origin === '') {
            setErrors({
                ...errors,
                Origin: 'Origin should not be empty',
            });
            
            return;
        }else{
            setErrors({
                ...errors,
                Origin: '',
            });
        }
    
        if (values.Dest === '') {
            setErrors({
                ...errors,
                Dest: 'Destination should not be empty',
            });
            return;
        }else{
            setErrors({
                ...errors,
                Dest: '',
            });
        }
        // Clear previous errors
        
        
        axios.post('http://localhost:8081/checkFlights', values)
        .then((res) => {
            const fetchedFlightData = res.data.flights;
            
            setFlightData(fetchedFlightData);
            setFlightID(fetchedFlightData.flightID);
    
        })
        .catch((err) => {
            console.error(err);
        });
      
    };
 

return(
    <div className="container">
        {/* <div className="d-flex flex-column p-3 bg-green"> */}
        <Header Profile1={Profile1} username={username}/>
        {/* </div> */}
        <div className="d-flex vh-80 justify-content-center align-items-top">
            <div className='p-3 bg-light border w-75'>
                <h2>Where To?</h2>
                <div className="">
                    <div className="pr-5">
                        <input type="text" placeholder='From...' name = 'Origin'
                        onChange={handleInput} className='form-control'/>
                        {errors.Origin && <span className='text-danger'> {errors.Origin} </span>}
                    </div>
                    <p></p>
                    <div>
                        <input type="text" placeholder='To...' name = 'Dest'
                        onChange={handleInput} className='form-control'/>
                        {errors.Dest && <span className='text-danger'> {errors.Dest} </span>}
                    </div>
                    <p></p>
                    <form action='' onSubmit={handleSumbit}>
                        
                        <button type='submit' className='btn btn-success w-100'>Search Flights</button>
                    </form>
                </div>
                
                {Array.isArray(flightData) && flightData.length > 0 && (
                    <div>
                        <h3>Flight Details</h3>
                        {flightData.map((flight, index) => (
                            <div className="flight-data-container" key={index}>
                                <p>Origin: {flight.ORIGIN} Departure Time: {flight.DEPARTURETIME}</p>
                                <p>Destination: {flight.DESTINATION} Landing Time: {flight.ARRIVALTIME}</p>

                                <button onClick={() => {
                                    setFlightID(flight.FLIGHTID);
                                    setSelectedFlightID(flight.FLIGHTID)}}
                                    className={selectedFlightID === flight.FLIGHTID ? 'selectedFlight' : ''}>
                                    Select Flight
                                </button>
                                <p></p>
                            </div>
                        ))}
                        
                        <Link to={`../BookFlight/${username}/${flightID2}`} className='btn btn-default border w-100 bg-light'> Select To Seat... </Link>
                                
                    </div>
                )}
            </div>
        </div>
    </div>
      

      
  )

}
export default FindFlight


 {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
<DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
    <DemoItem label="Uncontrolled picker" component="DateRangePicker">
    <DateRangePicker
        defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
    />
    </DemoItem>
    <DemoItem label="Controlled picker" component="DateRangePicker">
    <DateRangePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
    />
    </DemoItem>
</DemoContainer>
</LocalizationProvider> */}
              
             