let cart = [];

function loadCart() {
  const savedCart = localStorage.getItem("prival_cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }
}

function saveCart() {
  localStorage.setItem("prival_cart", JSON.stringify(cart));
}

function setupAddToCartListeners() {
  const productsContainer = document.querySelector(".products");
  if (!productsContainer) return;

  productsContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart-btn");
    if (!button) return;

    const name = button.getAttribute("data-name");
    const price = Number(button.getAttribute("data-price"));
    addToCart(name, price);
  });
}

function addToCart(name, price) {
  let item = cart.find((product) => product.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  saveCart();
  updateCart();
}

window.changeQuantity = function(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCart();
};

window.removeItem = function(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
};

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalElement = document.getElementById("total");
  const cartCount = document.getElementById("cartCount");

  if (!cartItems) return;
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                🛒
                <p>Кошик для спорядження порожній</p>
            </div>
        `;
    if (totalElement) totalElement.textContent = "0";
    if (cartCount) cartCount.textContent = "0 товарів";
    return;
  }

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">
                        ${item.price} грн × ${item.quantity}
                    </div>
                </div>

                <div class="quantity">
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>

                <strong>${item.price * item.quantity} грн</strong>

                <button class="remove" onclick="removeItem(${index})">
                    Видалити
                </button>
            </div>
        `;
  });

  if (totalElement) totalElement.textContent = total;
  if (cartCount) cartCount.textContent = `${count} товарів`;
}

function makeOrder() {
  if (cart.length === 0) {
    const emptyModal = document.getElementById("emptyCartModal");
    if (emptyModal) {
      emptyModal.classList.add("active");
    }
    return;
  }

  const modal = document.getElementById("orderModal");
  if (modal) {
    modal.classList.add("active");
  }

  cart = [];
  saveCart();
  updateCart();
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  setupAddToCartListeners();
  updateCart();
  
  const orderBtn = document.getElementById("orderBtn");
  if (orderBtn) {
    orderBtn.addEventListener("click", makeOrder);
  }

  const closeModalBtn = document.getElementById("closeModalBtn");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      const modal = document.getElementById("orderModal");
      if (modal) {
        modal.classList.remove("active");
      }
    });
  }

  const closeEmptyModalBtn = document.getElementById("closeEmptyModalBtn");
  if (closeEmptyModalBtn) {
    closeEmptyModalBtn.addEventListener("click", () => {
      const emptyModal = document.getElementById("emptyCartModal");
      if (emptyModal) {
        emptyModal.classList.remove("active");
      }
    });
  }
});