import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from './Footer'; 


function Home(){
  const {Profile1, username } = useParams();
  const shouldShowAdminLink = Profile1 === 'ADMIN';
  const shouldShowRegLink = Profile1 === 'REGUSER';
  const shouldShowAgentLink = Profile1 === 'AGENT';

  const [showAdminLink, setShowAdminLink] = useState(shouldShowAdminLink); 
  const [showRegLink, setShowRegLink] = useState(shouldShowRegLink); 
  const [showAgentLink, setShowAgentLink] = useState(shouldShowAgentLink); 
  
  useEffect(() => {
    // Code to run on page load
    console.log('Component has mounted!');
    console.log(Profile1)
   });  

  return(
    <div className="d-flex flex-column">
      <div className="p-3 bg-green">
        <Footer />
      </div>
      <div classname ="container vh-100 justify-content-center align-items-top">
          
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
           
        </form>

      </div>
      
    </div>
      

      
  )

}
export default Home