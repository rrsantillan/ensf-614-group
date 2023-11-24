import React from "react"
import axios from 'axios'
import  { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import validation from "./SignupValidation";

function Signup(){
   
    const [values, setValues] = useState({
        user: '',
        password: '',
        email: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    
    const handleInput = (event) => {
        setValues(prev => ({...prev,[event.target.name]: [event.target.value]})) 
    }
    const handleSumbit =(event)=> {
        event.preventDefault();
        setErrors(validation(values));
        if(errors.user === "" && errors.password === "" && errors.email === ""){
            axios.post('http://localhost:8081/signup', values)
            .then(res=> {
                navigate('/');
            })
            .catch(err=> console.log(err));
        }
    }
   
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className='p-3 bg-white w-75'>
                <h2>Sign-Up</h2>
                 <form action='' onSubmit={handleSumbit}>
                    <div className='mb-3'>
                        <label htmlFor="user"><strong> New UserName </strong></label>
                        <input type="text" placeholder='Enter UserName' name ='user'
                        onChange={handleInput} className='form-control'/>
                        {errors.user && <span className='text-danger'> {errors.user} </span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>New Password </strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                        onChange={handleInput} className='form-control'/>
                        {errors.password && <span className='text-danger'> {errors.password} </span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>New Email </strong></label>
                        <input type="email" placeholder='Enter Email' name='email'
                        onChange={handleInput} className='form-control'/>
                        {errors.password && <span className='text-danger'> {errors.email} </span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Sign Up</button>

                    <Link to='/' className='btn btn-default border w-100 bg-light'>Back To Login</Link>

                </form>
            </div>
        </div>
    )
}


export default Signup