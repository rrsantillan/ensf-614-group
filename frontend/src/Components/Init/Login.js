import axios from 'axios'
import React, {useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import validation from './Functions/LoginValidation';
import Button from 'react-bootstrap/Button'


function Login(){
    const [values, setValues] = useState({
        user: '',
        password: ''
    })
    
    const encodedUsername = encodeURIComponent(values.user); 
    const navigate = useNavigate();

    const handleNavigationCreateAccount = () => {
        navigate('./Signup');
    };

    const handleNavigationGuest = () => {
        navigate(`./FindFlight/${'guest'}`);
    };

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]})) 
    }
    const handleSumbit =(event)=> {
        event.preventDefault();
        setErrors(validation(values));
    
        if(errors.user === "" && errors.password === ""){
            axios.post('http://localhost:8081/login', values)
            .then(res=> {
        
               if(res.data === "Failed"){
                    alert("No Record");
                    
               }else { 
    
                    const fetchedUserArray = res.data.user;
                    const Profile1 = fetchedUserArray[0].PROFILE;
                    console.log(Profile1)
                    
                    navigate(`/home/${Profile1}/${encodedUsername}`);
                  
                   
               }
            })
            .catch(err=> console.log(err));
        }
        
    }
        

    return(
        <div >
            <div className="d-high justify-content-center align-items-center " >
                <h1 className = "display-2 pl-4 ">Oceanic Airlines </h1>
            </div>
            
            <div className = "d-block p-5 box align-items-center" sytle="height: 50px;"></div>

            <div className="mt-3 justify-content-center align-items-center custom-container-2">
                <span className="border-0 "> {/*probably not needed*/}
                    <div className='p-3 bg-light w-100'>
                        <h2>Log in</h2>
                        <form action='' onSubmit={handleSumbit}>
                            <div className='mb-3'>
                                <label htmlFor="user"><strong> Username </strong></label>
                                <div style ={{width: '10px'}}/>
                                <input type="user" placeholder='Enter Username' name ='user'
                                onChange={handleInput} className='form-control'/>
                                {errors.user && <span className='text-danger'> {errors.user} </span>}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password"><strong> Password </strong></label>
                                <div style ={{width: '10px'}}/>
                                <input type="password" placeholder='Enter Password' name='password'
                                onChange={handleInput} className='form-control'/>
                                {errors.password && <span className='text-danger'> {errors.password} </span>}
                            </div>
                            <button type='submit' className='btn btn-success w-100'>Log In</button>
                            <p></p>

                        </form>
                        <p></p>
                        
                        <form action='' onSubmit={handleNavigationCreateAccount}>
                            <button type='submit' className='btn btn-secondary w-100'>Create Account</button>
                            
                        </form>
                        <p></p>
                        <form action='' onSubmit={handleNavigationGuest}>
                            <button type='submit' className='btn btn-outline-secondary'>Continue as Guest</button>
                        </form>
                    </div>
                </span>
            </div>
        </div>
    )
}
export default Login;


