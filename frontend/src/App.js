
import React from 'react';
import Login from './Components/Init/Login'
import Signup from './Components/Init/Signup'

import Home from './Components/Home'
import Adminview from './Components/Admin/Adminview'
import FindFlight from './Components/Flight/FindFlight'
import ViewTicket from './Components/RegUser/ViewTicket.js'
import BookFlight from './Components/Flight/BookFlight'
import Agentview from './Components/Agent/Agentview'
import TestPage from './Testing/TestPage.js'
import TestPage2 from './Testing/TestPage2.js'



import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';


function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/Signup' element={<Signup/>}> </Route>
        <Route path='/home/:Profile1/:username' element={<Home/>}> </Route>
        <Route path='/Adminview/:Profile1/:username' element={<Adminview/>}></Route>
        <Route path='/FindFlight/:Profile1/:username' element={<FindFlight/>}> </Route>
        <Route path='/ViewTicket/:Profile1/:username' element={<ViewTicket/>}> </Route>
        <Route path='/BookFlight/:Profile1/:username/:flightID' element={<BookFlight/>}> </Route>
        <Route path='/Agentview/:Profile1/:username' element={<Agentview/>}> </Route>
        {/* Testing */}
        <Route path='/TestPage' element={<TestPage/>}> </Route>
        <Route path='/TestPage2' element={<TestPage2/>}> </Route>
        {/* Testing */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

