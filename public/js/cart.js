const cart = JSON.parse(localStorage.getItem('cart')) || [];
const API_PRODUCTS = `${API_BASE}/products`;
const API_ORDERS = `${API_BASE}/orders`;
const currentUser = JSON.parse(localStorage.getItem('user'));
let loadedProducts = [];

async function loadProductDetails() {
  loadedProducts = [];

  for (const item of cart) {
    try {
      const res = await fetch(`${API_PRODUCTS}/${item._id}`);
      const product = await res.json();
      loadedProducts.push({ ...product, qty: item.qty });
    } catch (err) {
      console.error('Failed to load product:', err);
    }
  }

  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById('cartItems');
  const grandTotalSpan = document.getElementById('grandTotal');
  cartContainer.innerHTML = '';

  let grandTotal = 0;

  loadedProducts.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    grandTotal += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div><strong>${item.name}</strong><br>₹${item.price}</div>
      <div>
        Qty:
        <button onclick="updateQty(${index}, -1)">-</button>
        ${item.qty}
        <button onclick="updateQty(${index}, 1)">+</button>
      </div>
      <div>₹${itemTotal}</div>
      <button onclick="removeItem(${index})" style="color:red">Remove</button>
    `;

    cartContainer.appendChild(itemDiv);
  });

  grandTotalSpan.innerText = grandTotal.toFixed(2);
}

function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  loadProductDetails();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadProductDetails();
}

document.getElementById('shippingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!currentUser || !currentUser._id) {
    alert('Please login to place order.');
    return;
  }

  const shippingAddress = {
    fullName: document.getElementById('fullName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    postalCode: document.getElementById('postalCode').value,
    country: document.getElementById('country').value,
  };

  const orderData = {
    user: currentUser._id,
    cartItems: cart,
    shippingAddress,
  };

  try {
    const res = await fetch(API_ORDERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      alert('✅ Order placed successfully!');
      localStorage.removeItem('cart');
      location.reload();
    } else {
      const data = await res.json();
      alert('❌ Order failed: ' + (data.message || 'Unknown error'));
    }
  } catch (err) {
    console.error(err);
    alert('❌ Error placing order');
  }
});

loadProductDetails();
