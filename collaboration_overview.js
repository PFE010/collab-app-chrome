// Function to open index.html in a new tab or window
function openIndexHTML() {
    // Replace 'index.html' with the actual path to your index.html file
    const indexHTMLPath = 'index.html';
  
    // Open index.html in a new tab or window
    window.open(indexHTMLPath, '_blank');
  }

// Function to add a new list item to the specified <ul> element
function addListItem() {
    const ulElement = document.querySelector('.UnderlineNav-body.list-style-none');
  
    if (ulElement) {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.className = 'd-inline-flex'; // Add class to the list item
    
        // Create an <a> element
        const linkElement = document.createElement('a');
        linkElement.href = '#'; // Set the href attribute (Replace with actual link)
        linkElement.textContent = 'Collaboration Overview'; // Replace with desired text for the link
    
        // Add click event listener to the <a> element to open index.html on click
        linkElement.addEventListener('click', function (event) {
          event.preventDefault(); // Prevent default link behavior
          openIndexHTML(); // Call function to open index.html
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