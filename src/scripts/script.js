function addCss() {
  // Get the <head> element from the document
  const headElement = document.head;

  // Create a <style> element
  const styleElement = document.createElement('style');

  // Add your CSS styles inside the <style> element
  styleElement.textContent = `
  @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap");

body *,
body *:before,
body *:after {
	box-sizing: border-box;
}

.Collab-app-content {
    margin: 0;
	padding: 0;
	overflow-x: hidden;
	display: flex;
	justify-content: center;
	font-family: "Lato", Arial, Helvetica, serif;
	font-size: 1em;
	width: 90vmin;
}

h2 {
	text-align: center;
}

.team {
	padding: 2em 0 2em 2.5em;
	margin: 0;
}

.member {
	margin: 1.5em 0 0.5em;
	padding: 0.73em;
	background: linear-gradient(
		83deg,
		var(--yellow) 0 97%,
		#fff0 calc(97% + 1px) 100%
	);
	position: relative;
	list-style: none;
	display: inline-block;
	transform: scale(0.85);
	transition: var(--trans);
}

.member:nth-of-type(even) {
	text-align: right;
	background: linear-gradient(
		-83deg,
		var(--yellow) 0 97%,
		#fff0 calc(97% + 1px) 100%
	);
}

.thumb {
	width: 13vmin;
	height: 13vmin;
	float: left;
	margin-right: 1.25em;
	background: linear-gradient(
		var(--deg),
		var(--dark) 0 70%,
		var(--yellow) 0% 100%
	);
	transform: rotate(-4deg);
	transition: var(--trans);
	border-radius: 0.25em;
	overflow: hidden;
	margin-left: -3em;
	padding: 0.5em;
}

.member:nth-of-type(even) .thumb {
	--deg: 86deg;
	float: right;
	margin-left: 2em;
	margin-right: -3em;
	transform: rotate(4deg);
}

.thumb img {
	width: 100%;
	height: 100%;
	border-radius: 0.25em;
	filter: grayscale(1);
	background: var(--dark);
}

.member:hover {
	transform: scale(1);
	transition: var(--trans);
	filter: drop-shadow(0px 20px 10px #0008);
}

.member:hover .thumb {
	padding: 0.1em;
	transition: var(--trans);
	transform: rotate(-1deg);
	--deg: -89deg;
}

.member:nth-of-type(even):hover .thumb {
	--deg: 91deg;
}

.member:hover .thumb img {
	filter: none;
	transition: var(--trans);
}

.Collab-app-description {
	padding-top: 1vmin;
}

.Collab-app-description p {
	padding: 0 2em;
	margin-bottom: 1em;
}

.Collab-app-h3 {
	background: linear-gradient(182deg, #fff0 60%, var(--dark) 0 100%);
	display: inline;
	transform: rotate(-2deg);
	position: absolute;
	margin: 0;
	margin-top: -2.25em;
	left: 9vmin;
	padding: 0.5em 0.75em;
	color: var(--yellow);
	border-radius: 0.25em;
	font-size: 1.35em;
	transform-origin: left bottom;
}

.member:nth-of-type(even) h3 {
	left: inherit;
	right: 9vmin;
	transform: rotate(2deg);
	transform-origin: right bottom;
	background: linear-gradient(-182deg, #fff0 60%, var(--dark) 0 100%);
}

.member:hover h3 {
	transition: var(--trans);
	transform: rotate(0deg);
	background: linear-gradient(180deg, #fff0 59%, var(--dark) 0 100%);
}

.co-funder:after {
	content: "CO-FUNDER";
	font-size: 0.75em;
	position: absolute;
	top: -1.5em;
	background: var(--yellow);
	right: 4em;
	transform: rotate(3deg);
	padding: 0.35em 0.75em 0.5em;
	border-radius: 0.25em;
	color: var(--dark);
	font-weight: bold;
}

.co-funder:nth-of-type(even):after {
	right: inherit;
	left: 4em;
	transform: rotate(-3deg);
}

.Collab-app-description p a {
	display: inline-block;
	margin: 0.5em 0 0 0;
	background: var(--dark);
	color: var(--yellow);
	padding: 0.1em 0.5em 0.35em;
	border-radius: 0.5em;
	text-decoration: none;
	transition: var(--trans);
}
.Collab-app-description p a:hover {
	transition: var(--trans);
	color: var(--dark);
	background: var(--yellow);
	font-weight: bold;
}

.Collab-app-description p a img {
	float: left;
	width: 22px;
	filter: invert(1);
	border-radius: 0.15em;
	padding: 2px;
	background: #fff;
	margin-right: 2px;
}

  `;

  // Append the <style> element to the <head> element
  headElement.appendChild(styleElement);
} 

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


function generateTable() {
  // Create elements
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'mt-3');

  const heading = document.createElement('h2');
  heading.classList.add('text-center');
  heading.textContent = 'All prs';

  const table = document.createElement('table');
  table.classList.add('table', 'table-bordered');

  const tableHead = document.createElement('thead');
  const tableHeadRow = document.createElement('tr');
  const tableHeaders = [
    'id_pull_request',
    'url',
    'description',
    'titre',
    'date_creation',
    'date_merge',
    'date_last_updated',
    'status',
    'labels'
  ];

  // Create table header cells
  tableHeaders.forEach(headerText => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    tableHeadRow.appendChild(headerCell);
  });
  tableHead.appendChild(tableHeadRow);

  const tableBody = document.createElement('tbody');
  tableBody.id = 'tableBody';

  // Assemble elements
  table.appendChild(tableHead);
  table.appendChild(tableBody);

  containerDiv.appendChild(heading);
  containerDiv.appendChild(table);

  return containerDiv
} 

function generateTab(node) {
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
    turboFrameElement.setAttribute('src', 'https://github.com/Souchy/Log721-Lab1');
    turboFrameElement.setAttribute('complete', '');

    const htmlContent = `
      <div>
        <h2>Your HTML Content</h2>
        <p>This is your HTML content injected into the element!</p>
      </div>
    `;

    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'clearfix container-xl px-md-4 px-lg-5 px-3 mt-4');

    const tableDiv = generateTable();
    // Set the HTML content to the target element
    newDiv.appendChild(tableDiv);
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
function onCLick() {
  console.log("on click");

  const targetElement = document.querySelector('main');
  const element = document.getElementById('collab-app');

  unSelect();

  element.classList.add('selected');

  generateTab(targetElement);
  populateTable();
}

// Function to add a new list item to the specified <ul> element
function addListItem() {
  console.log("add item");

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
      'js-selected-navigation-item',
      'selected'
    ];

    const linkElement = document.createElement('a');
    linkElement.id = 'collab-app';
    linkElement.href = '/collab-app'; // Set the href attribute (Replace with actual link)
    linkElement.textContent = 'Collaboration Overview'; // Replace with desired text for the link
    classesToAdd.forEach(className => {
      linkElement.classList.add(className);
    });

    // Add click event listener to the <a> element to open index.html on click
    linkElement.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior
      onCLick(); // Call function to open index.html
    });

    // Append <a> and <p> elements to the list item
    listItem.appendChild(linkElement);

    // Append the new list item to the <ul> element
    ulElement.appendChild(listItem);
  } else {
    console.error('Target <ul> element not found');
  }
}

// Link stylesheet
addCss();

// Call the function to add a list item when the content script runs
addListItem();

