// api/api.js
const apiUrl = '/api'; // Replace with your backend URL

async function fetchData(endpoint) {
  const response = await fetch(`${apiUrl}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error fetching data from ${endpoint}`);
  }
  return response.json();
}

export const getSomeData = async () => {
  return fetchData('data');
};

// You can define more functions for other endpoints as needed
