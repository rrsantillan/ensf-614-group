// linker.js
import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home'; // Import your Home component
import OtherPage from '../pages/OtherPage'; 
import BookTrip from '../pages/BookTrip';

function Sidebar() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/otherpage">Other Page</Link>
          </li>
          <li>
            <Link to="/BookTrip">Book Trip</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/otherpage" element={<OtherPage />} />
        <Route path="/BookTrip" element={<BookTrip />} />
      </Routes>
    </div>
  </Router>
  );
}

export default Sidebar;