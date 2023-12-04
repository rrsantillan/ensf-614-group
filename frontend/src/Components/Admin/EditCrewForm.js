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



// populates list of crew matching first name and last name
 const handleSearch = (e) => {
   e.preventDefault(); // Prevent the default form submission behavior
   console.log(values)
   axios.post('http://localhost:8081/admin/getCrewByName', values)
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
  * @param {*} selectedCrewId
  */
 const saveChangesToCrew = async (e) => {
   e.preventDefault(); // Prevent the default form submission behavior
   const requestData = { 
                        crewid: selectedCrewId,
                        fname: fname,
                        lname: lname,
                        position: position
                        
    }
    console.log(requestData)
   axios.post('http://localhost:8081/admin/overwriteCrewByCrewId', requestData)
     .then((res) => {
         // no need to do anything here, just writing to the database
         if(res.data === "Success"){
           // confirm
           alert("Details sucessfully saved!");
           // Fetch updated crew data after overwrite.
          axios.post('http://localhost:8081/admin/getCrewByName', values).then((res) => {
            const fetchedCrewData = res.data.crew;
            setCrewData(fetchedCrewData);
          }).catch((err) => {
            console.error(err);
          });
           
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


   /**
   * Deletes the selected crew member
   */
  const deleteCrewMember = async (e) => {
    e.preventDefault();
    
    console.log(selectedCrewId);
    axios.post('http://localhost:8081/admin/deleteCrewByCrewId', {crewid: selectedCrewId})
      .then((res) => {
        if (res.data === "Success") {
          // Handle successful deletion
          alert("Crew member deleted successfully.");
          setFirstName('');
          setLastName('');
          setPosition('');
          setSelectedCrewID(null);
        
          // Fetch updated crew data after deletion
          axios.post('http://localhost:8081/admin/getCrewByName', values).then((res) => {
          const fetchedCrewData = res.data.crew;
          setCrewData(fetchedCrewData);
        }).catch((err) => {
          console.error(err);
        });
        } else {
          alert("Unable to delete crew member.");
        }
        // Reset the form fields and selectedCrewId after deletion
        
      })
      .catch((err) => {
        console.error(err);
      });
  };


 return (
   <div>
       <form action='' onSubmit={handleSearch}>
                   <div>
                       <input type="text" placeholder='Bob' name = 'fname'
                       onChange={handleInput} className='form-control'/>
                     
                   </div>
                   <p></p>
                   <div>
                       <input type="text" placeholder='Dylan' name = 'lname'
                       onChange={handleInput} className='form-control'/>
                   
                   </div>
                   <p></p>
                   <button type='submit' className='btn btn-success w-100'>Search Crew</button>
               </form>

               {Array.isArray(crewData) && crewData.length > 0 && (
                  <div className="mt-3 p-2 border">
                    <div className="p-2 flight-details-container">
                        <h3>Crew Member Details</h3>
                          {crewData.map((crew, index) => (
                              <div className="p-2 flight-data-container" key={crew.crewid}>
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
                    </div> 
               )}
   <div className='my-3'>
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
           <button onClick={deleteCrewMember} className='btn btn-danger w-100' style={{ marginTop: '10px' }}>Delete Crew Member</button>
       </form>
     
   </div>
   </div>
 
 );
};

export default EditCrewForm;
