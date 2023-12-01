// Payment.js
import React, { useState, useEffect  } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Payment = (props) => {

    const { price, myValues} = props;
    const navigate = useNavigate();
    
   
    const [CardHolder, setCardHolder] = useState('');
    const [CardNumber, setCardNumber] = useState('');
    const [expiryMonth, setexpiryMonth] = useState('');
    const [expiryYear, setexpiryYear] = useState('');
    

    const [formData, setFormData] = useState({
        CardHolder: '',
        CardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        SIN: '',
        POSTAL: ''
    });


    //Input Format For Credit Card
    const handleInput = (e) => {
        const { name, value } = e.target;
        const formattedValue = value.replace(/\s/g, '').substring(0, 16);
        const formattedCardNumber = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(e.target.value);
        setFormData({
            ...formData,
            [name]: formattedCardNumber,
        });

    };

    //Input Format for Expiry Date
    const handleInput2 = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = value.replace(/\D/g, '');
        const limitedValue = sanitizedValue.slice(0, 2);
        setFormData({
            ...formData,
            [name]: limitedValue,
        });
    };
    //Input Format for CVV Number
    const handleInput3 = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = value.replace(/\D/g, '');
        const limitedValue = sanitizedValue.slice(0, 3);
        setFormData({
            ...formData,
            [name]: limitedValue,
        });
    };
    //Input Format For Postal Code
    const handleInput4 = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');
        const formattedPostalCode = sanitizedValue
          .replace(/(\d{3})(\d{3})/, '$1 $2') 
          .toUpperCase(); 
        
       
        setFormData({
          ...formData,
          [name]: formattedPostalCode,
        });
    };
    const handleInput5 = (e) => {
        const { name, value } = e.target;
        setCardHolder(e.target.value);
        setFormData({
            ...formData,
            [name]: value,
          });
        
       
    };

    const handleSumbit =(event)=> {
        event.preventDefault();
        console.log(myValues)
        axios.post('http://localhost:8081/bookflight', {values: myValues, price: price})
        
        .then(res=> {
            if(res.data === "Success"){
                sendEmail()
                //navigate(`/home/${'REGUSER'}/${myValues.username}`);
            }else {
                alert("Unable to book flight");
            }
        })
        .catch(err=> console.log(err));
        
        
        
    }
    useEffect(() => {
        // Update emailData whenever formData changes
        setEmailData((prevEmailData) => ({
          ...prevEmailData,
          body: getEmailBody(formData),
        }));
      }, [formData]);

    const getEmailBody = (formData) => {
        
        return ` 
            
            Hello ${myValues.username},

            Thank you for your order. 
            Your total amount is ${price}.
        
            Insurance Option: ${myValues.Insurance}
            Selected Class: ${myValues.selectedClass}
            Your Seat Number is ${myValues.SelectedSeat},
            
            Payment Method 
            Card Holder: ${formData.CardHolder}
            Card Number: ${formData.CardNumber}
            Expiry Month/Year: ${formData.expiryMonth}/${formData.expiryYear}
            Postal Code: ${formData.POSTAL}
            
            
            Regards,
            Oceanic Airlines!
            `;
        };
   

    const [emailData, setEmailData] = useState({
        to: 'braden11tink@gmail.com',
        subject: 'Booked Ticket!',
        body: getEmailBody(formData),
    });

    const sendEmail = async () => {
        console.log(formData.CardHolder)
        
        try {
          const response = await fetch('http://localhost:7002/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
          });
    
          const result = await response.json();
          console.log(result.message);  // Assuming the server sends a response with a 'message' property
    
        } catch (error) {
          console.error('Error sending email:', error);
        }
    };

    return (
        <div className="payment-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div className="payment-form" style={{ maxWidth: '400px', textAlign: 'left' }}>
                <h2>Pay Invoice</h2>

                {/* Payment Amount */}
                <div >
                    <label>Payment amount: </label>
                    <label className="p-2">{price}</label>
                </div>

                {/* Name on Card */}
                <div>
                    <label>Name on Card:</label>
                    <input type="text" placeholder='Card Holder' name='CardHolder' value={formData.CardHolder} onChange={handleInput5} className='form-control' />
                </div>

                <div>
                    <label>Card number:</label>
                    <input
                        type="text"
                        placeholder="Card Number"
                        name="CardNumber"
                        value={formData.CardNumber}
                        onChange={handleInput}
                        className ="form-control"
                    />
                </div>

                <div className = "col" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <label>Expiry Date:</label>
                        <div className = "col" style={{ display: 'flex', justifyContent: 'space-between' }}>                    
                            <input
                                type="text"
                                placeholder="MM"
                                name="expiryMonth"
                                value={formData.expiryMonth}
                                onChange={handleInput2}
                                maxLength="2"
                                className ="form-control"
                            />
                            <input
                                type="text"
                                placeholder="YY"
                                name="expiryYear"
                                value={formData.expiryYear}
                                onChange={handleInput2}
                                maxLength="2"
                                className ="form-control"
                            />
                        </div>

                    </div>
                    <div>
                        <label>Security code:</label>
                        <input
                            type="text"
                            placeholder="000"
                            name="SIN"
                            value={formData.SIN}
                            maxLength="3"
                            onChange={handleInput3}
                            className ="form-control"
                        />
                    </div>
                </div>
                <div>
                <label>Postal Code:</label>
                    <input 
                        type="text" 
                        placeholder='T5R 5P3' 
                        name="POSTAL"
                        value={formData.POSTAL}
                        maxLength="6"
                        onChange={handleInput4} 
                        className='form-control' 
                    />
                </div>
                <div>
                    <button onClick={handleSumbit} className="btn btn-primary">Make Payment</button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
