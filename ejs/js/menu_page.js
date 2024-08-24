function sendRequest(url, options = {}) {
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error get response');
            }
            return response.json();
        });
}

function displayMenu(data) {
    const menuItemsElement = document.getElementById('response_menu');
    if (Array.isArray(data) && data.length > 0) {
        menuItemsElement.innerHTML = data.map(item => `
            <div class="menu-item">
                <img src="${item.picture}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p>price: ${item.cost}$</p>
            </div>
        `).join('');
    } else {
        menuItemsElement.innerHTML = '<p>No menu items available</p>';
    }
}

sendRequest('/api/menu')
    .then(data => {
        displayMenu(data);
    })
    .catch(err => console.error('Error fetching menu:', err));