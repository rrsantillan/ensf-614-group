// EditCrewForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditCrewForm = () => {
 
 const [fname, setFirstName] = useState('');
 const [lname, setLastName] = useState('');
 const [position, setPosition] = useState('');


 const [crewData, setCrewData] = useState(null);
 const [crewId2, setCrewID] = useState(null);
 
 const [selectedCrewId, setSelectedCrewID] = useState(null);






 const [values, setValues] = useState({
  crewid: '', 
  fname: '',
   lname: '',
  position: ''
 })


 const handleInput = (event) => {
   const { name, value } = event.target;
   setValues({
   ...values,
   [name]: value,
   });
 };



// populates list of flights matching criteria
 const handleSearch = (e) => {
   e.preventDefault(); // Prevent the default form submission behavior
   console.log(values)
   axios.post('http://localhost:8081/getCrewByName', values)
   .then((res) => {
       
       const fetchedCrewData = res.data.crew;
       console.log('fetchedCrewData:', fetchedCrewData);
       setCrewData(fetchedCrewData);
       console.log(crewData)
       setCrewID(fetchedCrewData.crewid);
   })
   .catch((err) => {
       console.error(err);
   });
  };




 /**
  * Populates the edit crew details based on selection
  * @param {*} selectedCrewId
  */
 const populateEditFields = (selectedCrewId) => {

  
 }

 


 /**
  * Saves edit data and attempts INSERT
  * @param {*} FLIGHTID
  */
 const saveChangesToFlight = async (e) => {
   e.preventDefault(); // Prevent the default form submission behavior
   const requestData = { 
                        crewid: selectedCrewId,
                        fname: fname,
                        lname: lname,
                        position: position
                        
    }
   // console.log(FLIGHTID)
   axios.post('http://localhost:8081/overwriteCrewByCrewId', requestData)
     .then((res) => {
         // no need to do anything here, just writing to the database
         if(res.data === "Success"){
           //navigate(`/home/${username}`);
         }else if (requestData.flightID === null){
           alert("Flight ID was empty.");
         }
         else {
           alert("Unable to edit flight.");
         }
         console.log(res)
     })
     .catch((err) => {
         console.error(err);
     });
   }





 return (
   <div>
       <form action='' onSubmit={handleSearch}>
                   <div>
                       <input type="text" placeholder='Bob' name = 'fname'
                       onChange={handleInput} className='form-control'/>
                     
                   </div>
                   <div>
                       <input type="text" placeholder='Dylan' name = 'lname'
                       onChange={handleInput} className='form-control'/>
                   
                   </div>
                   <button type='submit' className='btn btn-success w-100'>Search Crew</button>
               </form>

               {Array.isArray(crewData) && crewData.length > 0 && (
                   <div className="flight-details-container">
                       <h3>Crew Member Details</h3>
                       {crewData.map((crew, index) => (
                           <div className="flight-data-container" key={crew.crewid}>
                               <p>First Name: {crew.fname}</p>
                               <p>Last Name: {crew.lname}</p>
                               <p>Title: {crew.position}</p>




                               <button onClick={() => {
                                   setCrewID(crew.crewid);
                                   setSelectedCrewID(crew.crewid)
                                   populateEditFields(crew.crewid);
                                  
                                   setFirstName(crew.fname)
                                   setLastName(crew.lname)
                                   setPosition(crew.position)
                                  
                                   }}
                                 
                                   className={selectedCrewId === crew.crewid ? 'selectedCrew' : ''}>
                                   Set Crew
                               </button>
                               <p></p>
                           </div>
                       ))}    
                   </div> 
               )}
   <div>
       <form className="flight-form" onSubmit={saveChangesToFlight} style={{ maxWidth: '400px' , margin: 'auto', textAlign: 'left' }}>
           <h3>Edit Details for Crew ID #: {selectedCrewId}</h3>


           <div className="form-control" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
               <label style={{ marginBottom: '5px' }}>
               First Name:
               </label>
               <input type="text" value={fname} onChange={(e) => setFirstName(e.target.value)} />
           </div>

           <div className="form-control" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
               <label style={{ marginBottom: '5px' }}>
               Last Name:
               </label>
               <input type="text" value={lname} onChange={(e) => setLastName(e.target.value)} />
           </div>

           <div className="form-control" style={{ marginBottom: '10px' }}>
               <label>
               Position/Title:
               <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
               </label>
           </div>

           <button type='submit' className='btn btn-success w-100'>Save Changes to Crew Member</button>
       </form>
     
   </div>
   </div>
 
 );
};

export default EditCrewForm;