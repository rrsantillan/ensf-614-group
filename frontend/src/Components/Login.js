import axios from 'axios'
import React, {useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import validation from './LoginValidation';


function Login(){
    const [values, setValues] = useState({
        user: '',
        password: ''
    })
    
    const encodedUsername = encodeURIComponent(values.user); 
    const navigate = useNavigate();

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
            <div className="d-high justify-content-center align-items-center" >
                <h1 >Welcome Oceanic Airlines </h1>
            </div>
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <div className='p-3 bg-white w-75'>
                    <h2>Login</h2>
                    <form action='' onSubmit={handleSumbit}>
                        <div className='mb-3'>
                            <label htmlFor="user"><strong> User </strong></label>
                            <div style ={{width: '10px'}}/>
                            <input type="text" placeholder='Enter UserName' name ='user'
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
                        <Link to='./Signup' className='btn btn-default border w-100 bg-light'> Create Account</Link>


                    
                    </form>
                    <div>
                        <p></p>
                        <Link to={`./FindFlight/${'guest'}`} className='btn btn-default border w-100 bg-light'> Continue as Guest</Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Login;


