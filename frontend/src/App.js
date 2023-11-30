
import React from 'react';
import Login from './Components/Login'
import Signup from './Signup'

import Home from './Components/Home'
import Adminview from './Components/Adminview'
import FindFlight from './Components/FindFlight'
import CurrentFlight from './Components/CurrentFlight'
import BookFlight from './Components/BookFlight'
import Agentview from './Components/Agentview'


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';


function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/Signup' element={<Signup/>}> </Route>
        <Route path='/home/:Profile1/:username' element={<Home/>}> </Route>
        <Route path='/Adminview/:username' element={<Adminview/>}></Route>
        <Route path='/FindFlight/:username' element={<FindFlight/>}> </Route>
        <Route path='/CurrentFlight/:username' element={<CurrentFlight/>}> </Route>
        <Route path='/BookFlight/:username/:flightID' element={<BookFlight/>}> </Route>
        <Route path='/Agentview' element={<Agentview/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

