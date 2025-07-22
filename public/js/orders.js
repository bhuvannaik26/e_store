// js/orders.js

const API_ORDERS = 'https://e-store-2a4a.onrender.com/api/orders';
const user = JSON.parse(localStorage.getItem('user'));
const ordersContainer = document.getElementById('ordersContainer');

if (!user) {
  ordersContainer.innerHTML = '<p class="text-danger">Please login to view your orders.</p>';
} else {
  loadOrders();
}

async function loadOrders() {
  try {
    const res = await fetch(API_ORDERS, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch orders');
    }

    const orders = await res.json();

    if (orders.length === 0) {
      ordersContainer.innerHTML = '<p>No orders found.</p>';
      return;
    }

    ordersContainer.innerHTML = '';
    orders.forEach(order => {
      const div = document.createElement('div');
      div.className = 'order border p-3 mb-3';

      const productList = order.products.map(p =>
        `<li>${p.name} - ₹${p.price} x ${p.qty}</li>`
      ).join('');

      div.innerHTML = `
        <h5>Order ID: ${order._id}</h5>
        <ul>${productList}</ul>
        <p><strong>Total:</strong> ₹${order.totalAmount}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Shipping Address:</strong> ${order.shippingAddress}</p>
        <button onclick="cancelOrder('${order._id}')" class="btn btn-danger btn-sm mt-2">Cancel Order</button>
      `;

      ordersContainer.appendChild(div);
    });
  } catch (err) {
    ordersContainer.innerHTML = `<p class="text-danger">${err.message}</p>`;
  }
}

async function cancelOrder(orderId) {
  if (!confirm('Are you sure you want to cancel this order?')) return;

  try {
    const res = await fetch(`${API_ORDERS}/${orderId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    if (!res.ok) {
      throw new Error('Failed to cancel order');
    }

    alert('Order cancelled successfully');
    loadOrders();
  } catch (err) {
    alert('Error: ' + err.message);
  }
}
