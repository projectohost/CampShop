let cart = [];

function setupAddToCartListeners() {
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = Number(button.getAttribute("data-price"));
      addToCart(name, price);
    });
  });
}

function addToCart(name, price) {
  let item = cart.find((product) => product.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  updateCart();
}

window.changeQuantity = function(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
};

window.removeItem = function(index) {
  cart.splice(index, 1);
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
    alert("🛒 Кошик порожній!");
    return;
  }

  const name = prompt("Введіть ваше ім'я для підтвердження замовлення:");
  if (!name) return;

  let total = 0;
  cart.forEach((item) => { total += item.price * item.quantity; });

  alert(`🌲 Дякуємо, ${name}!\n\nВаше замовлення на спорядження прийнято!\nСума для зв'язку: ${total} грн`);
  cart = [];
  updateCart();
}

document.addEventListener("DOMContentLoaded", () => {
  setupAddToCartListeners();
  updateCart();
  
  const orderBtn = document.getElementById("orderBtn");
  if (orderBtn) {
    orderBtn.addEventListener("click", makeOrder);
  }
});

function makeOrder() {
  if (cart.length === 0) {
    alert("🛒 Кошик порожній!");
    return;
  }

  alert("Дякую за покупку!");
  cart = [];
  updateCart();
}


function makeOrder() {
  if (cart.length === 0) {
    alert("🛒 Кошик порожній!");
    return;
  }

  const modal = document.getElementById("orderModal");
  if (modal) {
    modal.classList.add("active");
  }

  cart = [];
  updateCart();
}

document.addEventListener("DOMContentLoaded", () => {
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
});
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
  updateCart();
}

document.addEventListener("DOMContentLoaded", () => {
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
