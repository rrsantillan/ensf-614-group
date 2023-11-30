import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const ManageCrew = () => {
    const [formData, setFormData] = useState({
        // Define your form data state here
        // For example:
        flightNumber: '',
        departure: '',
        destination: '',
        // ... other form fields
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      // Function to handle form submission
      const handleSubmit = async (event) => {
        event.preventDefault();
        // Logic for handling form submission using axios
        try {
          // Make an axios request to submit form data
          const response = await axios.post('YOUR_ENDPOINT', formData);
          console.log('Form submitted:', response.data);
          // Handle success or perform necessary actions after submission
        } catch (error) {
          console.error('Error submitting form:', error);
          // Handle error cases
        }
      };
    
      return (
        <div>
          {/* Your form fields */}
          <div className="flight-details-container">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleInputChange}
                placeholder="Flight Number"
                />
                {/* Add other form fields here */}
                <button type="submit">Submit</button>
            </form>
          </div>
    
          {/* Scrollable component */}
          <div style={{ overflowY: 'scroll', height: '300px', border: '1px solid #ccc', marginTop: '20px' }}>
            {/* Content inside the scrollable div */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula velit vitae orci ultricies lacinia.
              Phasellus vitae fermentum velit. Nulla sit amet odio ac est vehicula fringilla id vel purus. Sed posuere
              sapien et velit placerat suscipit. Nulla facilisi. Proin placerat, lectus sed feugiat eleifend, libero
              libero facilisis eros, vitae sollicitudin turpis ipsum id odio. Suspendisse potenti.
            </p>
            <p>
              Integer sodales diam nec bibendum vestibulum. Proin ac dui vel sapien fermentum gravida. Vestibulum
              convallis lectus in est ultricies, eget aliquet libero pellentesque. Phasellus vel velit eget elit mollis
              fringilla vel vel augue. Sed et lorem nec mauris ullamcorper volutpat vitae nec nulla.
            </p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula velit vitae orci ultricies lacinia.
            Phasellus vitae fermentum velit. Nulla sit amet odio ac est vehicula fringilla id vel purus. Sed posuere
            sapien et velit placerat suscipit. Nulla facilisi. Proin placerat, lectus sed feugiat eleifend, libero
            libero facilisis eros, vitae sollicitudin turpis ipsum id odio. Suspendisse potenti.
            </p>
            <p>
            Integer sodales diam nec bibendum vestibulum. Proin ac dui vel sapien fermentum gravida. Vestibulum
            convallis lectus in est ultricies, eget aliquet libero pellentesque. Phasellus vel velit eget elit mollis
            fringilla vel vel augue. Sed et lorem nec mauris ullamcorper volutpat vitae nec nulla.
            </p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula velit vitae orci ultricies lacinia.
            Phasellus vitae fermentum velit. Nulla sit amet odio ac est vehicula fringilla id vel purus. Sed posuere
            sapien et velit placerat suscipit. Nulla facilisi. Proin placerat, lectus sed feugiat eleifend, libero
            libero facilisis eros, vitae sollicitudin turpis ipsum id odio. Suspendisse potenti.
            </p>
            <p>
            Integer sodales diam nec bibendum vestibulum. Proin ac dui vel sapien fermentum gravida. Vestibulum
            convallis lectus in est ultricies, eget aliquet libero pellentesque. Phasellus vel velit eget elit mollis
            fringilla vel vel augue. Sed et lorem nec mauris ullamcorper volutpat vitae nec nulla.
            </p>
            {/* Add more content here */}
          </div>
        </div>
      );

    // insert here

};

export default ManageCrew;