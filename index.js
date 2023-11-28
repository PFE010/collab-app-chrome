// Fetch data from the endpoint
fetch('http://localhost:3000/collab-app/pullRequests')
  .then(response => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the response body as JSON
    return response.json();
  })
  .then(data => {
    // Process the retrieved data
    console.log('Data received:', data);
    // Handle or display the data as needed
  })
  .catch(error => {
    // Handle errors that may occur during the fetch operation
    console.error('There was a problem with the fetch operation:', error);
  });
