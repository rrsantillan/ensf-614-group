// CrewEditor.js
import React, {  } from 'react';

const CrewEditor = ({ allCrew, selectedCrew, onSelectCrew, onRemoveCrew }) => {
  return (
    <div className="crew-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div className="crew-list" style={{ marginRight: '20px' }}>
        <h3>All Crew Members</h3>
        <ul className="crew-ul" style={{ listStyleType: 'none', padding: 0 }}>
          {allCrew.map((crew) => (
            <li key={crew.CREWID}>
              <button className="add-button" onClick={() => onSelectCrew(crew)}>Add</button> {crew.FNAME} 
            </li>
          ))}
        </ul>
      </div>

      <div className="selected-crew-list">
        <h3>Selected Crew Members</h3>
        <ul className="selected-crew-ul" style={{ listStyleType: 'none', padding: 0 }}>
          {selectedCrew.map((crew) => (
            <li key={crew.CREWID}>
              <button className="remove-button" onClick={() => onRemoveCrew(crew)}>Remove</button> {crew.FNAME}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrewEditor;