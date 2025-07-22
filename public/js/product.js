const API_PRODUCTS = 'http://localhost:5000/api/products';

// Get product ID from query string (?id=...)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (!productId) {
  document.getElementById('productContainer').innerHTML = '<p class="text-danger">❌ Product not found.</p>';
} else {
  loadProductDetails(productId);
}

async function loadProductDetails(id) {
  try {
    const res = await fetch(`${API_PRODUCTS}/${id}`);
    const product = await res.json();

    displayProduct(product);
  } catch (err) {
    console.error(err);
    document.getElementById('productContainer').innerHTML = '<p class="text-danger">❌ Failed to load product.</p>';
  }
}

function displayProduct(product) {
  const container = document.getElementById('productContainer');
  container.innerHTML = `
    <div class="col-md-6">
      <img src="${product.image}" class="img-fluid rounded shadow" alt="${product.name}">
    </div>
    <div class="col-md-6">
      <h2>${product.name}</h2>
      <p class="text-muted">${product.description}</p>
      <h4>₹${product.price}</h4>
      <p><strong>In Stock:</strong> ${product.countInStock}</p>
      <div class="mb-3">
        <label for="qty" class="form-label">Quantity:</label>
        <input type="number" id="qty" class="form-control" value="1" min="1" max="${product.countInStock}">
      </div>
      <button class="btn btn-success" onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.image}', ${product.countInStock})">🛒 Add to Cart</button>
    </div>
  `;
}

function addToCart(_id, name, price, image, countInStock) {
  const qty = parseInt(document.getElementById('qty').value);
  if (qty < 1 || qty > countInStock) {
    alert('❌ Invalid quantity');
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(item => item._id === _id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ _id, name, price, image, qty });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('✅ Added to cart');
}
