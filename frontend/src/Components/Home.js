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
        navigate(`../ViewTickets/${username}`);
    };

    const handleNavigationFindFlight = () => {
        navigate(`../FindFlight/${'guest'}`);
    };

    const handleNavigationAdminView = () => {
      navigate(`../Adminview/${username}`);
    };

    const handleNavigationAgentView = () => {
      navigate(`../Agentview`);
    };

  useEffect(() => {
    // Code to run on page load
   
   });  

   return (
    <Container className="d-flex flex-row">
      <Header /> {/* Assuming Header is your component for the header */}
      <div className="container vh-100 d-flex flex-column justify-content-center align-items-start">
        <h2>Home Page</h2>
        <Container className="pt-6">
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
      </div>
    </Container>
  );

}
export default Home