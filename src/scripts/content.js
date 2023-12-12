
function convertPRUrl(url) {
  // Split the API URL by '/' to extract parts
  const parts = url.split('/');

  // Extract owner, repository, and pull number from the parts
  const owner = parts[4];
  const repo = parts[5];
  const pullNumber = parts[7];

  // Construct the GitHub web URL for the pull request
  const webURL = `https://github.com/${owner}/${repo}/pull/${pullNumber}`;

  console.log(webURL);
  return webURL;
}

async function fetchPrData() {
  try {
    const response = await fetch('http://localhost:3000/collab-app/pullRequests');
    
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
      const response = await fetch('http://localhost:3000/collab-app/users');
      
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
    newDiv.classList.add('contentFrame');
    console.log(await fetchUsersData());
    // Set the HTML content to the target element
    newDiv.insertAdjacentHTML("afterbegin", generateHeader());
    newDiv.appendChild(generatePrTable(await fetchPrData()));
    newDiv.appendChild(generateUsersTable(await fetchUsersData()));

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
        <h2>Collaborations overview</h2>
        <p>This is your HTML content injected into the element!</p>
    </div>
    `;
}

function generatePrTable(data) {
    var div = document.createElement('div');
    div.classList.add('side-by-side')

    var table = document.createElement("table");
    table.id = "prTable";
    table.classList.add('contentTable');
    div.appendChild(table);

    // Create the table header
    var thead = document.createElement("thead");
    var headerRow = thead.insertRow();
    var headers = ["ID", "url", "Description", "Creation date", "Merge date", "Last update", "Status", "Labels"];

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
    var div = document.createElement('div');
    div.classList.add('side-by-side')

    var table = document.createElement("table");
    table.id = "usersTable";
    table.classList.add('contentTable');
    div.appendChild(table);

    // Create the table header
    var thead = document.createElement("thead");
    var headerRow = thead.insertRow();
    var headers = ["Username", "Points", "badges"];

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
  
async function populateTable() {
  try {
    console.log("test");

    const data = await fetchData();
    console.log(data);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('Collab-app-content');

    const teamList = document.createElement('ul');
    teamList.classList.add('team');

    data.forEach(item => {
      console.log("test1");
      const listItem = document.createElement('li');
      listItem.classList.add('member');

      const thumbnailDiv = document.createElement('div');
      thumbnailDiv.classList.add('thumb');
      const thumbnailImg = document.createElement('img');
      thumbnailImg.src = item.thumbnailUrl; // Replace 'thumbnailUrl' with the actual key from your data
      thumbnailDiv.appendChild(thumbnailImg);

      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('Collab-app-description');
      const title = document.createElement('h3');
      title.classList.add('Collab-app-h3');
      console.log("test2");

      const titleAnchor = document.createElement('a');
      titleAnchor.href = convertPRUrl(item.url); // Replace with your desired URL
      titleAnchor.textContent = item.titre; // Replace with your desired title text
      title.appendChild(titleAnchor);

      const paragraph = document.createElement('p');
      paragraph.textContent = item.description; // Replace 'description' with the actual key from your data
      paragraph.classList.add('Collab-app-p');

      const link = document.createElement('a');
      link.href = item.profileLink; // Replace 'profileLink' with the actual key from your data
      link.username = item.username; // Replace 'username' with the actual key from your data
      link.classList.add('Collab-app-profile-a');

      console.log("test3");

      paragraph.appendChild(link);
      descriptionDiv.appendChild(titleAnchor);
      descriptionDiv.appendChild(paragraph);

      listItem.appendChild(thumbnailDiv);
      listItem.appendChild(descriptionDiv);

      teamList.appendChild(listItem);
    });

    contentDiv.appendChild(teamList);
    document.body.appendChild(contentDiv);

    // Create a link element to import the CSS file
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'index.css';
    
    document.head.appendChild(linkElement);
  } catch (error) {
    console.error('Error while populating table:', error);
  }
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
    linkElement.textContent = 'Collaboration Overview'; // Replace with desired text for the link
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

