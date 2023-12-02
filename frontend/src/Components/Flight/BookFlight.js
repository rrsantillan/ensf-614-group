import React, {useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Payment from './Payment'
import '../../CSS/styles.css';
import Header from '../Header'; 


function BookFlight(){
  //Variables used to hold states of objects for the view
  //The setters are used inorder to change the values
  
  const { username, flightID } = useParams();

  const showPromoCode = username !== 'guest';

  const [promoCode, setPromoCode] = useState('');
  const [checkSeat, setcheckSeat] = useState('');
  const [seatMessage, setSeatMessage] = useState('');
  const [seatMap, setSeatMap] = useState([]);  
  const [price, setPrice] = useState();

  const [isChecked, setChecked] = useState(false);
  const [showPayment, setShowPayment] = useState(false);


  //Values is an array of values used to pass to a query on the backend
  const [values, setValues] = useState({
    selectedClass: '',
    SelectedSeat: '',
    flight_ID: '',
    username: '',
    Insurance: ''
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
      flight_ID: flightID,
      username: username,
      Insurance: "No"
      
    }));
    
    //Seatmap temp variable based on the selected value we preselect what 
    //Seats the user is allowed to select 
    
    if(event.target.value === 'Ordinary'){
      setPrice(300.00);
    }else if (event.target.value === 'Comfort'){
      setPrice(420.00);
    
    }else{
      setPrice(600.00);
    }
  
  };

  const handlePromoCodeChange = (e) => {
    e.preventDefault()
    setPromoCode(e.target.value);
    
  };
  const checkPromo = (e) => {
    e.preventDefault();
    console.log(promoCode)
    axios.post('http://localhost:8081/init/checkPromoCode', { User: username, Promo: promoCode })
    .then((res) => {
        if(res.data === "Yes"){
          setPrice(price - (price*0.5))
        }else{
          setPrice(price)
          setPromoCode("Invalid")
        }
    })
    .catch((err) => {
         console.error(err);
    });

  } 

  const generateSeatMap  =  (rowCount, columnCount) => {
    const tempSeatMap = []
    for (let row = 1; row <= rowCount; row++) {
      const rowSeats = [];
      for (let col = 1; col <= columnCount; col++) {
        rowSeats.push(`${String.fromCharCode(64 + col)}${row}`);
      }
      
      tempSeatMap.push(rowSeats);
    }
    return tempSeatMap;
  };

  const getSeatSelection  = () => {
    axios.post('http://localhost:8081/init/getAirPlaneSeatMap', { flightID: flightID })
    .then((res) => {
      const seatMap = res.data.seatMap;
    
      const newSeatMap = generateSeatMap(seatMap[0].ROWCNT, seatMap[0].COLCNT);
      setSeatMap([...newSeatMap]);
    })
    .catch((err) => {
        console.error(err);
    });

  } 


  /**
   * Function to that seats the unavilable seats value
   * function will bring back this value from the database later on 
   * @param {*} seat 
   * @returns 
   */
  const isSeatAvailable = async (seat) => {
    try {
      const response = await axios.post('http://localhost:8081/init/getUnavailableSeats', values);
      const fetchedSeatsArray = response.data.unSeats;
      const fetchedSeats = fetchedSeatsArray[0].TakenSeats;
      const takenSeatsArray = fetchedSeats.split(',').map((seat) => seat.trim());
  
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
        setcheckSeat(seat);
        
        setValues((prevValues) => ({
          ...prevValues,
          SelectedSeat: seat,
          flight_ID: flightID
        }));

        setSeatMessage('');
       
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
  const changePage = (e) => {
    e.preventDefault();
    setShowPayment(true)
  }


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
  return (
    <div className="d-flex flex-column">
      <div className="p-3 bg-green">
        <Header />
      </div>
      <div className="d-flex vh-100 justify-content-center align-items-top">
        <div className="p-3 bg-white w-75">
          <h2>Book Flight</h2>
          {!showPayment ? (
            <div>
              <h4>Departing Flight</h4>
              <div className="d-flex justify-content-left align-items-top">
                <label htmlFor="Class">Select Class: </label>
                <div style={{ width: '10px' }} />
                <select
                  id="Class"
                  onChange={(e) => {
                    handleClassChange(e);
                    getSeatSelection(e);
                  }}
                >
                  <option value="">Select...</option>
                  <option value="Ordinary">Ordinary</option>
                  <option value="Comfort">Comfort</option>
                  <option value="Business">Business</option>
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
                          className={`seat ${checkSeat === seat ? 'selected' : ''}`}
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
              {seatMessage && <div className="text-danger">{seatMessage}</div>}
              <p></p>
              <div>
                <h4>Flight Insurance</h4>
                <div className="d-flex justify-content-left align-items-top p-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setChecked(!isChecked);
                      editPayment();
                    }}
                    aria-label="Checkbox for following text input"
                  />
                  <text className="p-2"> Would you like Flight Insurance?</text>
                </div>
              </div>
              {showPromoCode && ( 
                <div className="row">
                  <form onSubmit={checkPromo} className="col-auto">
                    <div className="d-flex">
                      <input
                        type="text"
                        placeholder="Promo Code"
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                        maxLength="5"
                        className="form-control"
                      />
                      <button type="submit" className="btn btn-outline-success ml-2">
                        Apply
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <p></p>
              <div className="d-flex justify-content-left align-items-center">
                <text className ="p-2">Price: </text>
                <input 
                  id="outputTextarea"
                  className="form-control"
                  value={price !== undefined ? price.toFixed(2) : ''}
                  readOnly 
                  style={{ maxWidth: '150px' }}
                />
                <span style={{ fontWeight: 'bold', padding: '0 5px' }}>$</span>
              </div>
              <p></p>
              <button onClick={changePage} className="btn btn-success w-25" 
                disabled={!values.selectedClass}>
                Go To Payment
              </button>
            </div>
          ) : (
            <div>
              <Payment price={price} myValues={values} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
}
export default BookFlight