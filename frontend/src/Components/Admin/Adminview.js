import React, {useState} from 'react'
import { useParams } from 'react-router-dom';


import FlightForm from './AddFlightForm';
import EditFlightForm from './EditFlightForm';

import AddAircraftForm from './AddAircraftForm';
import DeleteAircraftForm from './DeleteAircraftForm'

import AddCrewForm from './AddCrewForm';
import EditCrewForm from './EditCrewForm';
import EditCrewAssignments from './EditCrewAssignment';


function AdminView(){
    //const { username } = useParams();
    const [activeTab, setActiveTab] = useState('create-flight'); // 'create-flight'


    const renderContent = () => {
        switch (activeTab) {
          case 'create-flight':
            return (
              <div>
                <h1>Create New Flight</h1>
                <FlightForm  />
              </div>
            );
          case 'addAircraft':
            return (
              <div>
                <h1>Add Aircraft</h1>
                <AddAircraftForm />
              </div>
            );

            case 'deleteAircraft':
            return (
              <div>
                <h1>Delete Aircraft</h1>
                <DeleteAircraftForm  />
              </div>
            );
            
          case 'edit-flight':
           return (
             <div>
               <h1>Edit Flights</h1>
               <EditFlightForm />
             </div>
             );

            case 'addNewCrew':
              return (
                <div>
                  <h1>Add Crew</h1>
                  <AddCrewForm />
                </div>
              );

            case 'edit-Crew':
              return (
                <div>
                  <h1>Edit or Delete Crew</h1>
                  <EditCrewForm  />
                </div>
              );

              case 'CrewAssignments':
              return (
                <div>
                  <h1>Edit Crew Assignments</h1>
                  <EditCrewAssignments  />
                </div>
              );

          
          default:
            return null;
        }
      };
    
    return(
     <div className="container mt-4">
        <div className="mb-4">
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'create-flight' ? 'active' : ''}`} onClick={() => setActiveTab('create-flight')}>Create New Flight</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'edit-flight' ? 'active' : ''}`} onClick={() => setActiveTab('edit-flight')}>Edit Flights</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'CrewAssignments' ? 'active' : ''}`} onClick={() => setActiveTab('CrewAssignments')}>Edit Crew Assignments</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'addNewCrew' ? 'active' : ''}`} onClick={() => setActiveTab('addNewCrew')}>Add New Crew Member</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'edit-Crew' ? 'active' : ''}`} onClick={() => setActiveTab('edit-Crew')}>Edit or Delete Crew Member</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'addAircraft' ? 'active' : ''}`} onClick={() => setActiveTab('addAircraft')}>Add New Aircraft</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeTab === 'deleteAircraft' ? 'active' : ''}`} onClick={() => setActiveTab('deleteAircraft')}>Remove Aircraft From Fleet</button>
            </li>
            </ul>
      </div>

      {renderContent()}
    </div>
    );
};

export default AdminView;
