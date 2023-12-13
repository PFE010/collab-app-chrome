
async function fetchPrData() {
  try {
    const response = await fetch('https://collab-app-service.azurewebsites.net/collab-app/pullRequests');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
}

async function fetchUsersData() {
    try {
      const response = await fetch('https://collab-app-service.azurewebsites.net/collab-app/users');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return [];
    }
}

async function generateTab(node) {
  if (node) {
    // Remove content header
    const headerElement = document.getElementById('repository-container-header');
    const newHeader = document.createElement('div');
    newHeader.id = 'repository-container-header';
    newHeader.setAttribute('data-turbo-replace', '');
    newHeader.setAttribute('hidden', '');
    headerElement.replaceWith(newHeader);

    // Create a new turbo-frame element
    const turboFrameElement = document.createElement('turbo-frame');
   
    // Set attributes for the turbo-frame element
    turboFrameElement.id = 'repo-content-turbo-frame';
    turboFrameElement.setAttribute('target', '_top');
    turboFrameElement.setAttribute('data-turbo-action', 'advance');
    turboFrameElement.setAttribute('complete', '');

    let newDiv = document.createElement('div');
    newDiv.classList.add('contentAppFrame');

    // Set the HTML content to the target element
    newDiv.appendChild(generateUsersTable(await fetchUsersData()));
    newDiv.appendChild(generatePrTable(await fetchPrData()));

    turboFrameElement.appendChild(newDiv);
    node.replaceChild(turboFrameElement, node.querySelector('turbo-frame'))

    window.location.href = window.location.href + '#collab-app';

    // Change the page title using document.title (replace with your desired title)
    document.title = 'Collaboration overview';
    } else {
      console.error('Target element not found');
    }
} 

function unSelect() {
  // Get the parent element
  const ulElement = document.querySelector('.UnderlineNav-body.list-style-none');

  // Get all list items inside the parent element
  const listItems = ulElement.querySelectorAll('li');

  // Loop through the list items
  listItems.forEach(item => {
    // Get the <a> element within each list item
    const anchorElement = item.querySelector('a');
    anchorElement.removeAttribute('aria-current');

    // Check if the <a> element has a class named 'selected'
    if (anchorElement && anchorElement.classList.contains('selected')) {
        // Remove the 'selected' class from the <a> element
        anchorElement.classList.remove('selected');
    }
  });
}

function generateHeader() {
    return `
    <div>
        <h2>Repo Users</h2>
    </div>
    `;
}

function generatePrTable(data) {
    var div = document.createElement('div');

    let header = document.createElement('h2');
    header.textContent = 'Repo Pull Requests'
    div.appendChild(header);

    var table = document.createElement("table");
    table.id = "prTable";
    table.classList.add('contentAppTable');
    div.appendChild(table);

    // Create the table header
    var thead = document.createElement("thead");
    var headerRow = thead.insertRow();
    var headers = ["Titre", "url", "Description", "Creation date", "Merge date", "Last update", "Status", "Labels"];

    for (var i = 0; i < headers.length; i++) {
        var th = document.createElement("th");
        th.textContent = headers[i];
        headerRow.appendChild(th);
    }

    table.appendChild(thead);

    // Create the table body
    var tbody = document.createElement("tbody");

    for (var i = 0; i < data.length; i++) {
        var row = tbody.insertRow(i);

        for (var j = 0; j < headers.length; j++) {
        var cell = row.insertCell(j);
        cell.textContent = data[i][headers[j].toLowerCase()];
        }
    }

    table.appendChild(tbody);
    return div;
}

function generateUsersTable(data) {
    let div = document.createElement('div');

    let header = document.createElement('h2');
    header.textContent = 'Repo Users'
    div.appendChild(header);

    let table = document.createElement("table");
    table.id = "usersTable";
    table.classList.add('contentAppTable');
    div.appendChild(table);

    // Create the table header
    let thead = document.createElement("thead");
    let headerRow = thead.insertRow();
    let headers = ["Username", "Points", "Badges"];

    for (var i = 0; i < headers.length; i++) {
        let th = document.createElement("th");
        th.textContent = headers[i];
        headerRow.appendChild(th);
    }

    table.appendChild(thead);

    // Create the table body
    var tbody = document.createElement("tbody");

    for (var i = 0; i < data.length; i++) {
        var row = tbody.insertRow(i);

        for (var j = 0; j < headers.length; j++) {
            var cell = row.insertCell(j);
            console.log(i + 'data:' + data[i][headers[j].toLowerCase()]);
            if(headers[j] === "Badges" && data[i][headers[j].toLowerCase()] !== undefined) {
                data[i][headers[j].toLowerCase()].forEach(imagePath => {
                    console.log(imagePath['image']);
                    let  badge = document.createElement("div");
                    badge.classList.add('side-by-side');
                    
                    badge.id = imagePath['image'].split('.')[0];
                    cell.appendChild(badge);
                });
            }
            else {
                cell.textContent = data[i][headers[j].toLowerCase()];
            }
        }
    }

    table.appendChild(tbody);
    return div;
}

// Function to open index.html in a new tab or window
async function onCLick() {
  const targetElement = document.querySelector('main');
  const element = document.getElementById('collab-app');

  // Remove selected from other list item
  unSelect();

  element.classList.add('selected');

  await generateTab(targetElement);
}

// Function to add a new list item to the specified <ul> element
function addListItem() {
  const ulElement = document.querySelector('.UnderlineNav-body.list-style-none');
  const collabAppLiElement = document.getElementById('collab-app');

  if (ulElement && !collabAppLiElement) {
    // Create a new list item
    const listItem = document.createElement('li');
    listItem.setAttribute('data-view-component', 'true'); // Set data-view-component attribute
    listItem.className = 'd-inline-flex'; // Add class to the list item

    // Create an <a> element
    const classesToAdd = [
      'UnderlineNav-item',
      'no-wrap',
      'js-responsive-underlinenav-item',
      'js-selected-navigation-item'
    ];

    const linkElement = document.createElement('a');
    linkElement.id = 'collab-app';
    linkElement.href = '/collab-app'; // Set the href attribute (Replace with actual link)
    linkElement.textContent = 'PR Podium'; // Replace with desired text for the link
    classesToAdd.forEach(className => {
      linkElement.classList.add(className);
    });

    // Add click event listener to the <a> element to open index.html on click
    linkElement.addEventListener('click', async function (event) {
      event.preventDefault(); // Prevent default link behavior
      await onCLick(); // Call function to open index.html
    });

    // Append <a> and <p> elements to the list item
    listItem.appendChild(linkElement);

    // Append the new list item to the <ul> element
    ulElement.appendChild(listItem);
  } else {
    console.error('Target <ul> element not found');
  }
}

// Call the function to add a list item when the content script runs
addListItem();

