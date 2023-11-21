
import React from 'react';
import Login from './Componets/Login'
import Signup from './Signup'
import Home from './Home'
import Admin from './Componets/Adminview'
import FindFlight from './Componets/FindFlight'
import CurrentFlight from './Componets/CurrentFlight'
import BookFlight from './Componets/BookFlight'


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';


function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/Signup' element={<Signup/>}> </Route>
        <Route path='/home/:username' element={<Home/>}> </Route>
        <Route path='/Adminview/:username' element={<Admin/>}></Route>
        <Route path='/FindFlight/:username' element={<FindFlight/>}> </Route>
        <Route path='/CurrentFlight/:username' element={<CurrentFlight/>}> </Route>
        <Route path='/BookFlight/:username/:flightID' element={<BookFlight/>}> </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

