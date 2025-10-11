// Modal Elements
let modal = document.getElementById('productModal');
let modalTitle = document.getElementById('modalTitle');
let modalPrice = document.getElementById('modalPrice');
let modalImg = document.getElementById('modalImg');
let qtyDisplay = document.getElementById('qty');

let currentProduct = {};
let qty = 1;

// Cart Sidebar Elements
let cartPanel = document.getElementById('cartSidebar');
let cartItems = document.getElementById('cartItems');
let cartTotal = document.getElementById('cartTotal');

// Open Product Modal
function openProduct(name, price, img) {
  currentProduct = { name, price, img };
  modalTitle.textContent = name;
  modalPrice.textContent = '₱' + price.toFixed(2);
  modalImg.src = img;

  qty = 1;
  qtyDisplay.textContent = qty;

  modal.style.display = 'flex';
  modal.classList.remove('hide');
  modal.classList.add('show');
}

// Close Modal with animation
function closeModal() {
  modal.classList.remove('show');
  modal.classList.add('hide');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Update quantity in modal
function changeQty(amount) {
  qty = Math.max(1, qty + amount);
  qtyDisplay.textContent = qty;
}

// Add to Cart from Modal
function addToCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already in cart, increase qty instead of adding duplicate
  const existingIndex = cart.findIndex(item => item.name === currentProduct.name);
  if (existingIndex > -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push({ ...currentProduct, qty });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  closeModal();
  showCart();
}

// Add to Cart directly from card with qty = 1
function addToCartDirect(name, price, img) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingIndex = cart.findIndex(item => item.name === name);
  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showCart();
}

// Buy Now from Modal
function buyNow() {
  if (currentProduct && currentProduct.name) {
    localStorage.setItem('selectedProduct', JSON.stringify({
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.img,
      qty: qty
    }));
  }
  window.location.href = "checkout.html";
}

// Buy Now directly from product card
function buyProduct(name, price, image) {
  localStorage.setItem('selectedProduct', JSON.stringify({
    name,
    price,
    image,
    qty: 1
  }));
  window.location.href = "checkout.html";
}

// Show Cart Sidebar and update UI
function showCart() {
  cartItems.innerHTML = '';
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item" data-index="${index}">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <p>${item.name}</p>
          <small>₱${item.price.toFixed(2)} × 
            <button onclick="changeCartQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeCartQty(${index}, 1)">+</button>
          </small>
        </div>
        <span class="remove-btn" onclick="removeItem(${index})">✖</span>
      </div>
    `;
  });

  cartTotal.textContent = `Total: ₱${total.toFixed(2)}`;
  cartPanel.classList.add('active');
}

// Close Cart Sidebar
function closeCart() {
  cartPanel.classList.remove('active');
}

// Remove item from cart by index
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (index > -1 && index < cart.length) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  showCart();
}

// Change quantity of item in cart sidebar
function changeCartQty(index, amount) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (index > -1 && index < cart.length) {
    cart[index].qty = Math.max(1, cart[index].qty + amount);
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
  }
}

// Like button toggle (no changes)
function toggleLike(el, event) {
  event.stopPropagation();
  el.classList.toggle("liked");
}

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
  showCart();
});
