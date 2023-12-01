import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Payment from './Payment'
import '../CSS/styles.css';

function BookFlight(){
  //Variables used to hold states of objects for the view
  //The setters are used inorder to change the values
  
  const { username, flightID } = useParams();
  const [selectedSeat, setSelectedSeat] = useState('');
  const [seatMessage, setSeatMessage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [seatMap, setSeatMap] = useState([]);  
  const [price, setPrice] = useState();
  const [rowcnt, setrowcnt] = useState('');
  const [colcnt, setcolcnt] = useState('');
  

  //Values is an array of values used to pass to a query on the backend
  const [values, setValues] = useState({
    selectedClass: '',
    SelectedSeat2: '',
    flight_ID: '',
    username: '',
    Insurance: ''
  })
  const generateSeatMap = (rowCount, columnCount) => {
    setSeatMap([])
    
    for (let row = 1; row <= rowCount + 3; row++) {
      const rowSeats = [];
      for (let col = 1; col <= columnCount; col++) {
        rowSeats.push(`${String.fromCharCode(64 + col)}${row}`);
      }
      seatMap.push(rowSeats);
    }
  
    return seatMap;
  };
  useEffect(() => {
    
    axios.post('http://localhost:8081/getAirPlaneSeatMap', {flightID: flightID})
    .then((res) => {
      setcolcnt(res.data.seatMap[0].COLCNT)
      setrowcnt(res.data.seatMap[0].ROWCNT)

    })
    .catch((err) => {
      console.error(err);
    });
    let newSeatMap = [];
    
    newSeatMap = generateSeatMap(rowcnt, colcnt)
    setSeatMap(newSeatMap)
    console.log(rowcnt)
    console.log(colcnt)
  });
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
      flight_ID: flightID,
      username: username,
      Insurance: "No"
      
    }));
    
    

    //Seatmap temp variable based on the selected value we preselect what 
    //Seats the user is allowed to select 
    setSelectedClass(event.target.value)
    
    if(event.target.value === 'Economy'){
      setPrice(300.00);
      

    }else{
      setPrice(400.00);
      
      
    }
   
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
  


  const [showPayment, setShowPayment] = useState(false);
  const changePage = (e) => {
    e.preventDefault();
    setShowPayment(true)
  }


 const [isChecked, setChecked] = useState(false);
 const editPayment = () => {
    
    if (!isChecked) {
      setPrice(price + 50)
      setValues((prevValues) => ({
        ...prevValues,
        Insurance: "Yes"
      }));
      
    }else{
      setPrice(price - 50)
      setValues((prevValues) => ({
        ...prevValues,
        Insurance: "No"
      }));
    }

  };



  /**
   * View is shows below 
   */
  return(
   
    <div className="d-flex vh-100 justify-content-center align-items-top">
        <div className='p-3 bg-white w-75'>
          <h2>Book Flight</h2>
          {!showPayment ? (
            <form action=''>
                <h4>Departing Flight</h4>
                <div className = "d-flex justify-content-left align-items-top">
                  <label htmlFor="Class">Select Class: </label>
                  <div style ={{width: '10px'}}/>
                  <select id="Class" value={selectedClass} onChange={handleClassChange}>
                    <option value="">Select...</option>
                    <option value="Business">Business</option>
                    <option value="Ordinary">Ordinary</option>
                    <option value="Comfort">Comfort</option>
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
                <p></p>
                <div>
                  <h4>Flight Insurance</h4>
                  <div className="d-flex justify-content-left align-items-top p-2">
                    <input 
                      type="checkbox"  
                      onChange={() => {
                        setChecked(!isChecked);
                        editPayment(); // Call the editPayment function on checkbox change
                      }}
                      aria-label="Checkbox for following text input"/>
                    <text className = "p-2"> Would you like Flight Insurance?</text>
                    </div>
                </div>
                <div>
                   
                   
                      <div className="d-flex justify-content-left align-items-center">
                      <text className ="p-2">Price: </text>
                      <textarea 
                        className ="p-1"
                        id="outputTextarea"
                        value={price}
                        readOnly  
                        rows={1}
                        cols={10}
                      />
                      <text>$</text>
                      </div>
                 </div>
                 <p></p>
                <button onClick = {changePage}  className='btn btn-success w-25'>Go To Payment</button>
            </form>
          ) : (
            <div>
              <Payment price={price} myValues = {values} />
            </div>
         )}
        </div>
    </div>
  )
}
export default BookFlight