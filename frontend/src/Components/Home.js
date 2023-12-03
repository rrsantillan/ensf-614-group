import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Header from './Header'; 
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


function Home(){
  const {Profile1, username } = useParams();
  const shouldShowAdminLink = Profile1 === 'ADMIN';
  const shouldShowRegLink = Profile1 === 'REGUSER';
  const shouldShowAgentLink = Profile1 === 'AGENT';

  const [showAdminLink] = useState(shouldShowAdminLink); 
  const [showRegLink] = useState(shouldShowRegLink); 
  const [showAgentLink] = useState(shouldShowAgentLink); 
  
  const navigate = useNavigate();

    const handleNavigationViewTickets = () => {
        navigate(`../ViewTicket/${Profile1}/${username}`);
    };

    const handleNavigationFindFlight = () => {
        navigate(`../FindFlight/${Profile1}/${username}`);
    };

    const handleNavigationAdminView = () => {
      navigate(`../Adminview/${Profile1}/${username}`);
    };

    const handleNavigationAgentView = () => {
      navigate(`../Agentview/${Profile1}/${username}`);
    };

    const handleNavigationTestPage = () => {
      navigate(`../TestPage/${Profile1}/${username}`);
    };

  useEffect(() => {
    // Code to run on page load
   
   });  

  return(
    <div className="container-fluid">
      <Header Profile1={Profile1} username={username}/>{/* Assuming Header is your component for the header */}
      {/* <div className="container vh-100 justify-content-center align-items-start"> */}
        <div className="my-3">
          <h2>
            Home Page
          </h2>
        </div>
        <Container className="pt-6">
          {/* test page */}
          <Button type='submit' className='' variant="danger w-100" onClick={handleNavigationTestPage}>*Test Page*</Button>
          <p></p>
           {/* test page */}
          <form action=''>
            {showRegLink && (
              <Button type='submit' className='btn btn-secondary w-100' onClick={handleNavigationViewTickets}>
                View Tickets
              </Button>
            )}
            <p></p>
            <Button type='submit' className='btn btn-primary w-100' onClick={handleNavigationFindFlight}>
              Find Flights
            </Button>
            <p></p>
            {showAdminLink && (
              <Button type='submit' className='btn btn-secondary w-100' onClick={handleNavigationAdminView}>
                Admin View
              </Button>
            )}
            <p></p>
            {showAgentLink && (
              <Button type='submit' className='btn btn-secondary w-100' onClick={handleNavigationAgentView}>
                Agent View
              </Button>
            )}
          </form>
        </Container>
      {/* </div> */}
    </div>
  );

}
export default Home