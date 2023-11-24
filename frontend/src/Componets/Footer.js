import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    navigate('/');
  };

  return (
    <footer>
      <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
    </footer>
  );
};

export default Footer;
