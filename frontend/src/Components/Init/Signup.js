import axios from 'axios'
import  { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { createEmailBody, createEmailData, sendEmail } from './Functions/EmailFunctions'; // Adjust the path based on your file structure
import validation from "./Functions/SignupValidation";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const Signup = (props) => {
   
    const [values, setValues] = useState({
        user: '',
        password: '',
        email: ''
    })
    
    const promoCode = '50OFF';

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    
    useEffect(() => {
        // Update emailData whenever formData changes
        setEmailData((prevEmailData) => ({
          ...prevEmailData,
          to: values.email,
          body: getEmailBody(values),
        }));
      }, [values]);

    const handleInput = (event) => {
       setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
        
    }
    
    // Use useEffect to observe the values state
    //useEffect(() => {
    //    console.log(values); // Log values whenever it changes
    //}, [values]);


    const getEmailBody = useCallback((values) => {
        return `
        Hello ${values.user},

        This is your password: ${values.password}

        You are using this email: ${values.email}

        Thank you for signing up with Oceanic!

        Here's your promo code: ${promoCode}

        Regards,
        Your Oceanic Airlines`;
    }, [values]);


    
    const [emailData, setEmailData] = useState({
        to: '',
        // to: values.email,
        subject: 'Welcome!',
        body: getEmailBody(values),
    });


    useEffect(() => {
        if (errors.user === '' && errors.password === '' && errors.email === '') {
          setEmailData((prevEmailData) => ({
            ...prevEmailData,
            to: values.email[0],
          }));
          sendEmail();
    
          axios
            .post('http://localhost:8081/init/signup', values)
            .then((res) => {
              console.log('New User Signed up!');
              alert('Congratulations on sign up!');
              navigate('/');
            })
            .catch((err) => console.log(err));
        }
      }, [errors, navigate, values]);
    
      const handleSumbit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
      };


    const sendEmail = async () => {
        console.log("frontend sendEmail call (async)")
       
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
        <div className="d-flex vh-100 justify-content-center align-items-center">
            
            <div className='p-4 bg-light border w-75'>
                <h2>Signup</h2>
                <p></p>
                 <form action='' onSubmit={handleSumbit}>
                    <div className='mb-3'>
                        <label htmlFor="user"><strong> New Username </strong></label>
                        <input type="text" placeholder='Enter Username' name ='user'
                        onChange={handleInput} className='form-control'/>
                        {errors.user && <span className='text-danger'> {errors.user} </span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>New Password </strong></label>
                        <input type="password" placeholder='Enter password' name='password'
                        onChange={handleInput} className='form-control'/>
                        {errors.password && <span className='text-danger'> {errors.password} </span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>New Email </strong></label>
                        <input type="email" placeholder='Enter Email' name='email'
                        onChange={handleInput} className='form-control'/>
                        {errors.email && <span className='text-danger'> {errors.email} </span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Sign up</button>
                    <p></p>
                    <Link to='/' className='btn btn-default border w-100 bg-light'>Back To Login</Link>

                </form>
            </div>
        </div>
    );
};


export default Signup;