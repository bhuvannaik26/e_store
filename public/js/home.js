// js/home.js

const API_BASE = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000/api'
  : 'https://e-store-2a4a.onrender.com/api';

// Reusable fetch function
async function fetchAPI(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return await res.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('featured-products');

  try {
    const products = await fetchAPI('/products/featured');
    if (products.length === 0) {
      container.innerHTML = '<p>No featured products found.</p>';
      return;
    }

    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';
      card.innerHTML = `
        <div class="card h-100">
          <img src="${p.image}" class="card-img-top" alt="${p.name}" />
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">₹${p.price}</p>
            <a href="product.html?id=${p._id}" class="btn btn-primary">View</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p class="text-danger">${err.message}</p>`;
  }
});
