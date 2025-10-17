const axios = require('axios');
// const mobile = '8792593183'; // Replace with the actual mobile number
async function deleteData(mobile) {
  try {
    const response = await axios.post(
      'https://stage.getzype.com/profile-service/api/v2/deleteData',
      { email: "", mobile },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('Delete API Status:', response.status);
    console.log('Delete API Response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Delete API Error status:', error.response.status);
      console.error('Delete API Error data:', error.response.data);
    } else {
      console.error('Delete API Error:', error.message);
    }
  }
}

// Export the function so you can use it in your spec
module.exports = { deleteData };
