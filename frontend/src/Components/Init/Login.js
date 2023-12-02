import axios from 'axios'
import React, {useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import validation from './Functions/LoginValidation';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


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
        <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="text-center w-100">
            <Col>
                <h1 className="display-2">Oceanic Airlines</h1>
            </Col>
            </Row>
    
            <Row className="justify-content-center w-100 mt-5">
            <Col md={6}>
                <div className='p-4 bg-light'>
                <h2>Log in</h2>
                <Form onSubmit={handleSumbit}>
                    <Form.Group className='mb-3'>
                        <Form.Label><strong>Username</strong></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        name="user"
                        onChange={handleInput}
                        className='form-control'
                    />
                    {errors.user && <span className='text-danger'>{errors.user}</span>}
                    </Form.Group>
    
                    <Form.Group className='mb-3'>
                        <Form.Label><strong>Password</strong></Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleInput}
                        className='form-control'
                    />
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </Form.Group>
    
                    <Button type='submit' className='btn btn-success w-100'>Log In</Button>
                </Form>
    
                <div className="mt-3">
                    <Form onSubmit={handleNavigationCreateAccount}>
                    <Button type='submit' className='btn btn-secondary w-100'>Create Account</Button>
                    </Form>
            
                    <Form onSubmit={handleNavigationGuest}>
                    <Button type='submit' className='outline-primary mt-3 w-100'>Continue as Guest</Button>
                    </Form>
                </div>
                </div>
            </Col>
            </Row>
     </Container>
    )
}
export default Login;


