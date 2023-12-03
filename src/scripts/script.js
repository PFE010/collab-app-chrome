function generateTab(node) {
  if (node) {
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

    // Set the HTML content to the target element
    newDiv.innerHTML = htmlContent;
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
    console.log(anchorElement);

    // Check if the <a> element has a class named 'selected'
    if (anchorElement && anchorElement.classList.contains('selected')) {
        // Remove the 'selected' class from the <a> element
        anchorElement.classList.remove('selected');
    }
  });
}

// Function to open index.html in a new tab or window
function onCLick() {
  console.log("on click");

  const targetElement = document.querySelector('main');
  const element = document.getElementById('collab-app');

  unSelect();

  element.classList.add('selected');

  generateTab(targetElement);
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
  
  // Call the function to add a list item when the content script runs
  addListItem();