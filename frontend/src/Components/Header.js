import React from 'react';
import { useNavigate  } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    navigate('/');
  };
  
  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history
  };

  return (
    <header className="">
      <div className="container d-flex flex-column p-3 bg-green">
        <div className="row">
          <div className="col-6">
          <button onClick={handleGoBack} className="btn btn-outline-info">
          ⇦ Back
          </button>
          </div>
          <div>
            Oceanic
          </div>
          <div className="col-6 d-flex justify-content-end">
          <button onClick={handleLogout} className="btn btn-outline-danger mr-2">
            Logout
          </button>
          </div>
        </div>
      </div>
    </header>
    
  
  );
};

export default Footer;
