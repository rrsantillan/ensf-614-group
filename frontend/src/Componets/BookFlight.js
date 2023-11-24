import React, {useState} from 'react'

import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

import '../CSS/styles.css';

function BookFlight(){
  //Variables used to hold states of objects for the view
  //The setters are used inorder to change the values
  const navigate = useNavigate();
  const { username, flightID } = useParams();
  const [selectedSeat, setSelectedSeat] = useState('');
  const [seatMessage, setSeatMessage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [price, setPrice] = useState('');
  const [seatMap, setSeats] = useState([]);

  //Values is an array of values used to pass to a query on the backend
  const [values, setValues] = useState({
    price: '',
    selectedClass: '',
    SelectedSeat2: '',
    flight_ID: '',
    username: ''
  })

  /**
   * handleClassChange is used to set the values of the values
   * array that is used in the query. 
   * It is an event so we can take the current state of the object before
   * passing it to the object
   * @param {*} event 
   */
  const handleClassChange = (event) => {

    setValues((prevValues) => ({
      ...prevValues,
      selectedClass: event.target.value,
      price: event.target.value === 'Bussniess' ? "$400.00": "$300.00",
      flight_ID: flightID,
      username: username
 
    }));
    
   
    //Seatmap temp variable based on the selected value we preselect what 
    //Seats the user is allowed to select 
    setSelectedClass(event.target.value)
    let newSeatMap;
    if(event.target.value === 'Economy'){
      setPrice(`${"300.00$"}`);
      newSeatMap = [
        ['A4', 'B4', 'C4',  ' ', 'D4','E4', 'F4'],
        ['A5', 'B5', 'C5',  ' ', 'D4','E5', 'F5'],
        ['A6', 'B6', 'C6',  ' ', 'D4','E6', 'F6'],
        ['A7', 'B7', 'C7',  ' ', 'D4','E7', 'F7'],
        ['A8', 'B8', 'C8',  ' ', 'D8','E8', 'F8'],
        ['A9', 'B9', 'C9',  ' ', 'D9','E9', 'F9'],
        ['A10', 'B10', 'C10',  ' ', 'D10','E10', 'F10']];
      

    }else{
      setPrice(`${"400.00$"}`);
      newSeatMap = [
        ['A1', 'B1', ' ','C1', 'D1'],
        ['A2', 'B2', ' ','C2', 'D2'],
        ['A3', 'B3', ' ','C3', 'D3']];
      
    }
    setSeats(newSeatMap);
    //console.log('Selected Class:', event.target.value);

  };


  /**
   * Function to that seats the unavilable seats value
   * function will bring back this value from the database later on 
   * @param {*} seat 
   * @returns 
   */
  const isSeatAvailable = async (seat) => {
    try {
      const response = await axios.post('http://localhost:8081/getUnavailableSeats', values);
      const fetchedSeatsArray = response.data.unSeats;
      const fetchedSeats = fetchedSeatsArray[0].TakenSeats;
      const takenSeatsArray = fetchedSeats.split(',').map((seat) => seat.trim());
  
      console.log(takenSeatsArray);
  
     
  
      return !takenSeatsArray.includes(seat);
    } catch (error) {
      console.error('Error fetching unavailable seats:', error);
      throw error; // Rethrow the error for the calling function to handle
    }
  };

  
  /**
   * handle seat selection checks seat selection against taken 
   * seats
   * shows error message if the user cannot select the seat 
   * @param {*} seat 
   */
  const handleSeatSelect = async (seat) => {
    try {
      if (seat === ' ') {
        setSeatMessage(`This is the aisle please select a seat. Thank you`);
      }else if (await isSeatAvailable(seat)) {
        setSelectedSeat(seat);
        
        setValues((prevValues) => ({
          ...prevValues,
          SelectedSeat2: seat,
          flight_ID: flightID
        }));

        setSeatMessage('');
        console.log('Selected Seat:', seat);

        
        // Update the textarea with the selected seat
        const textarea = document.getElementById('outputTextarea');
        if (textarea) {
          textarea.value = seat;
        }
      }else{

        setSeatMessage(`Seat ${seat} is not available. Please choose another seat.`);
      }
    } catch (error) {
      console.error('Error checking seat availability:', error);
      // Handle error appropriately based on your application's requirements
    }
  };

  
  


  /**
   * handleSubmit send the current information to the data base 
   * of what seat is being selected 
   * 
   * @param {*} event 
   */
  const handleSumbit =(event)=> {
    event.preventDefault();
    console.log(values)
   
    axios.post('http://localhost:8081/bookflight', values)
    
    .then(res=> {
        if(res.data === "Success"){
            navigate(`/home/${username}`);
        }else {
            alert("Unable to book flight");
        }
    })
    .catch(err=> console.log(err));
    
    
  }




  /**
   * View is shows below 
   */
  return(
   
    <div className="d-flex vh-100 justify-content-center align-items-top">
        <div className='p-3 bg-white w-75'>
          <h2>Book Flight</h2>
          <form action='' onSubmit={handleSumbit}>
                <h4>Departing Flight</h4>
                <div className = "d-flex justify-content-left align-items-top">
                  <label htmlFor="Class">Select Class: </label>
                  <div style ={{width: '10px'}}/>
                  <select id="Class" value={selectedClass} onChange={handleClassChange}>
                    <option value="">Select...</option>
                    <option value="Bussniess">Bussniess</option>
                    <option value="Economy">Economy</option>
                  </select>
                  </div>
                  <p></p>
                  <div>
                    <h4>Seat Selection</h4>
                    <div className="seat-map">
                      {seatMap.map((row, rowIndex) => (
                        <div key={rowIndex} className="seat-row">
                          {row.map((seat) => (
                            <div
                              key={seat}
                              className={`seat ${selectedSeat === seat ? 'selected' : ''}`}
                              onClick={() => handleSeatSelect(seat)}
                            >
                              {seat}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p></p>
                  {/* Display a message for unavailable seats */}
                  {seatMessage && (
                    <div className="text-danger">{seatMessage}</div>
                  )}
                  {/* Display the selected seat information */}
                  <div className="d-flex justify-content-left align-items-top">
                    <label htmlFor="outputTextarea" >Selected Seat: </label>
                    <div style={{ width: '10px' }} />
                    <textarea name ='SelectedSeat2'
                      id="outputTextarea"
                      value={selectedSeat}
                      readOnly
                      rows={1}
                      cols={10}
                    />
                  </div>
                  <p></p>
                  <div className = "d-flex justify-content-left align-items-top">
                    <label htmlFor="outputTextarea">Cost: </label>
                      <div style ={{width: '75px'}}/>
                      <textarea
                        id="outputTextarea"
                        value={price}
                        readOnly  
                        rows={1}
                        cols={10}
                      />
                  </div>
                  <p></p>
                  <button type='submit' className='btn btn-success w-100'>Book Flight</button>
             </form>
        </div>
    </div>
      

      
  )

}
export default BookFlight