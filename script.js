const products = [
    {
        id: 1,
        name: "Free Fire 100 Diamonds",
        category: "Games",
        price: "$1.00",
        image: "fa-fire"
    },
    {
        id: 2,
        name: "Mobile Legends 50 Diamonds",
        category: "Games",
        price: "$1.20",
        image: "fa-shield-halved"
    },
    {
        id: 3,
        name: "PUBG Mobile 60 UC",
        category: "Games",
        price: "$0.99",
        image: "fa-crosshairs"
    },
    {
        id: 4,
        name: "Google Play $10 Gift Card",
        category: "E-Wallet",
        price: "$10.00",
        image: "fa-google-play"
    },
    {
        id: 5,
        name: "Steam Wallet $20",
        category: "E-Wallet",
        price: "$20.00",
        image: "fa-steam"
    },
    {
        id: 6,
        name: "Phone Credit $5",
        category: "Credit",
        price: "$5.00",
        image: "fa-mobile-screen"
    }
];

const productContainer = document.getElementById('product-container');

function renderProducts() {
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <div class="badge">Hot</div>
            <div class="product-image">
                <i class="fa-brands ${product.image}"></i>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3>${product.name}</h3>
                <div class="product-footer">
                    <span class="price">${product.price}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;

        productContainer.appendChild(productCard);
    });
}

let cart = [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartIcon();
    renderCartItems();
    openCart();
}

function updateCartIcon() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.innerText = cart.length;
}

// Cart Modal Logic
const cartModal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

function openCart() {
    cartModal.classList.add('active');
}

function closeCart() {
    cartModal.classList.remove('active');
}

if (cartBtn) cartBtn.addEventListener('click', openCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

// Close cart when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCart();
    }
});

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const priceVal = parseFloat(item.price.replace('$', ''));
            total += priceVal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>${item.price}</span>
                </div>
                <div class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });
    }

    totalPriceEl.innerText = '$' + total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartIcon();
    renderCartItems();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Checkout successful! Total: ${totalPriceEl.innerText}`);
    cart = [];
    updateCartIcon();
    renderCartItems();
    closeCart();
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        // Simple toggle for now, would ideally need CSS class for mobile menu
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(11, 12, 21, 0.95)';
            navLinks.style.padding = '2rem';
        }
    });
}

// Initial Render
document.addEventListener('DOMContentLoaded', renderProducts);
