async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/collab-app/pullRequests');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
}

async function populateTable() {
  try {
    const data = await fetchData();
    console.log(data);
    
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');

      Object.values(item).forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error while populating table:', error);
  }
}

populateTable();
