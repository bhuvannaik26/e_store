order.js// js/orders.js

const API_ORDERS = `${API_BASE}/orders`;
const user = JSON.parse(localStorage.getItem('user'));
const ordersContainer = document.getElementById('ordersContainer');

if (!user) {
  alert('Please log in to view your orders.');
  window.location.href = 'login.html';
}

async function fetchUserOrders() {
  try {
    const res = await fetch(`${API_ORDERS}/${user._id}`);
    const orders = await res.json();
    displayOrders(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    ordersContainer.innerHTML = '<p>Error loading orders.</p>';
  }
}

function displayOrders(orders) {
  if (orders.length === 0) {
    ordersContainer.innerHTML = '<p>You have no orders yet.</p>';
    return;
  }

  ordersContainer.innerHTML = '';
  orders.forEach(order => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'order';

    const productsList = order.products
      .map(p => `<li>${p.name} (x${p.qty}) - ₹${p.price}</li>`)
      .join('');

    const shipping = order.shippingAddress;
    const shippingText = `${shipping.fullName}, ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}`;

    orderDiv.innerHTML = `
      <h3>Order ID: ${order._id}</h3>
      <p><strong>Products:</strong></p>
      <ul>${productsList}</ul>
      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      <p><strong>Shipping Address:</strong> ${shippingText}</p>
      <p class="order-status ${order.status === 'Cancelled' ? 'cancelled' : ''}">
        Status: ${order.status}
      </p>
      <button class="btn" onclick="cancelOrder('${order._id}')" ${order.status === 'Cancelled' ? 'disabled' : ''}>
        Cancel Order
      </button>
    `;

    ordersContainer.appendChild(orderDiv);
  });
}

async function cancelOrder(orderId) {
  if (!confirm('Are you sure you want to cancel this order?')) return;

  try {
    const res = await fetch(`${API_ORDERS}/cancel/${orderId}`, {
      method: 'PUT',
    });

    const data = await res.json();
    alert(data.message || 'Order cancelled');
    fetchUserOrders(); // Refresh list
  } catch (error) {
    console.error('Cancel failed:', error);
    alert('Failed to cancel order.');
  }
}

// Initial fetch
fetchUserOrders();
