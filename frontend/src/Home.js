import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from './Components/Footer'; 


function Home(){
  const {Profile1, username } = useParams();
  const shouldShowAdminLink = Profile1 === 'Admin';
  const shouldShowRegLink = Profile1 === 'REGUSER';
  const shouldShowAgentLink = Profile1 === 'Agent';

  const [showAdminLink, setShowAdminLink] = useState(shouldShowAdminLink); 
  const [showRegLink, setShowRegLink] = useState(shouldShowRegLink); 
  const [showAgentLink, setShowAgentLink] = useState(shouldShowAgentLink); 
  
  useEffect(() => {
    // Code to run on page load
    console.log('Component has mounted!');
    console.log(Profile1)
   });  

  const [emailData, setEmailData] = useState({
    to: 'braden11tink@gmail.com',
    subject: 'test',
    body: 'Whats up',
  });
  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/send-', {
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

  return(
    <div class="container">  
      <div class = "row" classname ="vh-100 justify-content-center align-items-top">
          
        <h2>Home Page</h2>
        <form action=''>
            {showRegLink && (
              <Link to={`../CurrentFlight/${username}`} className='btn btn-default border w-100 bg-light'> Current Flights </Link>
            )}
            <Link to={`../FindFlight/${username}`} className='btn btn-default border w-100 bg-light'> FindFlight </Link>
            {showAdminLink && (
                <Link to={`../Adminview/${username}`} className='btn btn-default border w-100 bg-light'>Admin View</Link>
            )}
             {showAgentLink && (
                <Link to={`../Agentview`} className='btn btn-default border w-100 bg-light'>Agent View</Link>
            )}
            <div>
                <button onClick={sendEmail}>Send Email</button>
            </div>
        </form>

      </div>
      <div className="row p-3 bg-green w-25 justify-content-bottom align-items-bottom">
        <Footer />
      </div>
    </div>
      

      
  )

}
export default Home