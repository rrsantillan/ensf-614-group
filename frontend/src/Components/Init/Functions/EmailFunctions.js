// emailFunctions.js

const createEmailBody = (myValues, price, CardHolder) => {
    const emailBody = `
      Hello ${myValues.username},
  
      Thank you for your order. 
      Your total amount is ${price}.
  
      Insurance Option: ${myValues.Insurance}
      Your Seat Number is ${myValues.SelectedSeat2},
      
      Card Holder: ${CardHolder}
  
      Regards,
      Your Oceanic Airlines`;
  
    return emailBody;
  };
  
  const createEmailData = (to, subject, body) => {
    return {
      to,
      subject,
      body,
    };
  };
  
  const sendEmail = async (emailData) => {
    try {
      const response = await fetch('http://localhost:7002/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      const result = await response.json();
      console.log(result.message); // Assuming the server sends a response with a 'message' property
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  export { createEmailBody, createEmailData, sendEmail };
  