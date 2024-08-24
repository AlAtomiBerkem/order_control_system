document.getElementById('fetch_orders').addEventListener('click', async () => {
  const personName = document.getElementById('person_name').value;

  try {
    const response = await fetch(`/api/user/orders/${personName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();
    displayUserInfo(user);
    fetchUserOrders(user.orders);
  } catch (error) {
    console.error('Error:', error);
    alert('Error fetching user data. Please try again.');
  }
});

async function fetchUserOrders(ordersIds) {
  for (const orderId of ordersIds) {
    try {
      const response = await fetch(`/api/menu/${orderId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const order = await response.json();
      displayOrderInfo(order);
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      alert(`Error fetching order ${orderId}. Please try again.`);
    }
  }
}

function displayUserInfo(user) {
  const ordersContainer = document.getElementById('orders_container');
  ordersContainer.innerHTML = `
    <h2>${user.name}</h2>
  `;
}

function displayOrderInfo(order) {
  const ordersContainer = document.getElementById('orders_container');
  ordersContainer.innerHTML += `
    <div class="person_order">
      <h4>${order.title}</h4>
      <p>${order.description}</p>
      <p>Price: ${order.cost}$</p>
    </div>
  `;
}
