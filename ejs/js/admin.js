document.getElementById('fetch_all_orders').addEventListener('click', async () => {
  try {
    const response = await fetch('/api/orders');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const orders = await response.json();
    displayAllOrders(orders);
  } catch (error) {
    console.error('Error:', error);
    alert('Error fetching orders data. Please try again.');
  }
});

function displayAllOrders(orders) {
  const ordersContainer = document.getElementById('orders_container');
  ordersContainer.innerHTML = '';

  orders.forEach(orders => {
    ordersContainer.innerHTML += `
    <div class="person_order">
      <h4>id person:${orders.id}</h4>
      <p>Item is Active: ${orders.isActive}</p>
      <p>Item ID: ${orders.itemId}</p>
      <P>Create Order: ${orders.createdAt}</P>
    </div>
    `;
  });
}
