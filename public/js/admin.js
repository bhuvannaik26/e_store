// frontend/js/admin.js
const API_BASE = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

// 🔐 Check Admin Access
fetch(`${API_BASE}/auth/profile`, {
  headers: { Authorization: `Bearer ${token}` }
})
  .then(res => res.json())
  .then(user => {
    if (!user.isAdmin) {
      alert("❌ Access denied: Admins only");
      window.location.href = 'index.html';
    } else {
      loadProducts();
      loadOrders();
    }
  });

// ➕ Add New Product
document.getElementById('addProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const product = {
    name: document.getElementById('name').value,
    image: document.getElementById('image').value,
    price: +document.getElementById('price').value,
    description: document.getElementById('description').value,
    countInStock: +document.getElementById('countInStock').value,
  };

  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });

  const data = await res.json();
  if (res.ok) {
    alert('✅ Product added');
    loadProducts();
    e.target.reset();
  } else {
    alert('❌ Failed to add product');
    console.log(data);
  }
});

// 📦 Load All Products
async function loadProducts() {
  const res = await fetch(`${API_BASE}/products`);
  const products = await res.json();
  const list = document.getElementById('productList');
  list.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${p.name}</strong> - ₹${p.price} (Stock: ${p.countInStock})`;
    list.appendChild(li);
  });
}

// 📋 Load All Orders
async function loadOrders() {
  const res = await fetch(`${API_BASE}/orders`);
  const orders = await res.json();
  const list = document.getElementById('orderList');
  list.innerHTML = '';

  orders.forEach(order => {
    const li = document.createElement('li');
    li.innerHTML = `
      🧾 Order by User: ${order.user?.name || 'Unknown'} - ₹${order.totalAmount} 
      <br>📍 ${order.shippingAddress?.city || 'N/A'}, ${order.shippingAddress?.country}
      <br>Status: ${order.status}
      <br><button onclick="cancelOrder('${order._id}')">❌ Cancel Order</button>
      <hr>
    `;
    list.appendChild(li);
  });
}

// ❌ Cancel an Order
async function cancelOrder(orderId) {
  if (!confirm('Are you sure you want to cancel this order?')) return;
  const res = await fetch(`${API_BASE}/orders/cancel/${orderId}`, {
    method: 'PUT'
  });
  if (res.ok) {
    alert('🛑 Order cancelled');
    loadOrders();
  } else {
    alert('❌ Failed to cancel order');
  }
}
