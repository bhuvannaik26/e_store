const API_PRODUCTS = 'http://localhost:5000/api/products';

let products = [];
let selectedProduct = null;

// Load all products from backend
async function loadProducts() {
  try {
    const res = await fetch(API_PRODUCTS);
    products = await res.json();
    displayProducts(products);
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

// Render all products as cards
function displayProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  products.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'col';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;" />
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-truncate">${product.description}</p>
          <p class="card-text fw-bold">₹${product.price}</p>
          <button class="btn btn-primary" onclick="showDetails('${product._id}')">View Details</button>
        </div>
      </div>
    `;
    productList.appendChild(card);
  });
}

// Show product detail view
function showDetails(productId) {
  selectedProduct = products.find(p => p._id === productId);
  if (!selectedProduct) return;

  document.getElementById('detailTitle').textContent = selectedProduct.name;
  document.getElementById('detailImage').src = selectedProduct.image;
  document.getElementById('detailDesc').textContent = selectedProduct.description;
  document.getElementById('detailPrice').textContent = selectedProduct.price;
  document.getElementById('detailStock').textContent = selectedProduct.countInStock;
  document.getElementById('qtyInput').value = 1;

  document.getElementById('productList').style.display = 'none';
  document.getElementById('productDetails').style.display = 'block';
}

// Hide product detail view
function hideDetails() {
  selectedProduct = null;
  document.getElementById('productList').style.display = 'flex';
  document.getElementById('productDetails').style.display = 'none';
}

// Add product to cart (localStorage)
function addToCart() {
  const qty = parseInt(document.getElementById('qtyInput').value);
  if (!selectedProduct || qty < 1 || qty > selectedProduct.countInStock) {
    alert('Invalid quantity');
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(item => item._id === selectedProduct._id);
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({
      _id: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      qty,
      image: selectedProduct.image
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('✅ Added to cart');
  hideDetails();
}

// Load products on page load
loadProducts();
