
import React from 'react';
import Login from './Components/Init/Login'
import Signup from './Components/Init/Signup'

import Home from './Components/Home'
import Adminview from './Components/Admin/Adminview'
import FindFlight from './Components/Flight/FindFlight'
import ViewTicket from './Components/RegUser/ViewTicket'
import BookFlight from './Components/Flight/BookFlight'
import Agentview from './Components/Agent/Agentview'


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
        <Route path='/ViewTicket/:username' element={<ViewTicket/>}> </Route>
        <Route path='/BookFlight/:username/:flightID' element={<BookFlight/>}> </Route>
        <Route path='/Agentview' element={<Agentview/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

