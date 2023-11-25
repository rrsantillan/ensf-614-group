// Payment.js
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Payment = (props) => {

    const { Price, values, username } = props;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        CardNumber: '',
    });


    //Input Format For Credit Card
    const handleInput = (e) => {
        const { name, value } = e.target;
        const formattedValue = value.replace(/\s/g, '').substring(0, 16);
        const formattedCardNumber = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
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


    return (
        <div className="payment-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div className="payment-form" style={{ maxWidth: '400px', textAlign: 'left' }}>
                <h2>Pay Invoice</h2>

                {/* Payment Amount */}
                <div>
                <label>Payment amount:</label>
                <label>{Price}</label>
                </div>

                {/* Name on Card */}
                <div>
                    <label>Name on Card:</label>
                    <input type="text" placeholder='Card Holder' name='CardHolder' onChange={handleInput} className='form-control' />
                </div>

                <div>
                    <label>Card number:</label>
                    <input
                        type="text"
                        placeholder="Card Number"
                        name="CardNumber"
                        value={formData.CardNumber}
                        onChange={handleInput}
                        className="form-control"
                    />
                </div>

                <div class = "col" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <label>Expiry Date:</label>
                        <div class = "col" style={{ display: 'flex', justifyContent: 'space-between' }}>                    
                            <input
                                type="text"
                                placeholder="MM"
                                name="expiryMonth"
                                value={formData.expiryMonth}
                                onChange={handleInput2}
                                maxLength="2"
                                className="form-control"
                            />
                            <input
                                type="text"
                                placeholder="YY"
                                name="expiryYear"
                                value={formData.expiryYear}
                                onChange={handleInput2}
                                maxLength="2"
                                className="form-control"
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
                            className="form-control"
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
