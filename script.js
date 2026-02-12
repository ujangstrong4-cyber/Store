const products = [
    {
        id: 1,
        name: "Free Fire 100 Diamonds",
        category: "Games",
        price: "Rp 15.000",
        image: "https://iplay.lk/wp-content/uploads/2023/08/freefire.jpg"
    },
    {
        id: 2,
        name: "Mobile Legends 50 Diamonds",
        category: "Games",
        price: "Rp 15.000",
        image: "https://thumb.viva.id/vivanewsgames/375x211/2025/09/15/68c761679bd5e-sejarah-perkembangan-mobile-legends_subdomain-ai.jpg"
    },
    {
        id: 3,
        name: "PUBG Mobile 60 UC",
        category: "Games",
        price: "Rp 15.000",
        image: "https://yt3.googleusercontent.com/qwJu_kd0PAULpj_kHXc1bf_W0SKvjNPbkFtZe-XCOfP2ztISgCmZa7BlUkNofNnxXK1VOsre=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        id: 4,
        name: "Google Play 150rb Gift Card",
        category: "E-Wallet",
        price: "Rp 150.000",
        image: "https://productimages.nimbledeals.com/nimblebuy/google-play-gift-code-26-69853-regular.jpg"
    },
    {
        id: 5,
        name: "Steam Wallet 200rb",
        category: "E-Wallet",
        price: "Rp 200.000",
        image: "https://row.haluan.co/wp-content/uploads/2023/11/STEAM-2.jpeg"
    },
    {
        id: 6,
        name: "Axis 50rb",
        category: "Credit",
        price: "Rp 50.000",
        image: "https://lh4.googleusercontent.com/proxy/J326uZR5DEtv895o2bUwVfelFyb6ZhmY-6EWpcpBcQx29WlY6z27KekPgTt_SOyaFcOSRUMQtYHfQg6Vde6qEp9NzW1gF9ahWAh55Qn851zMDZLDIwdCUdGDIu8-Imwb1WWPdo7z96ieA2NDi0mxkf1zESgthyLvhVuS"
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
                ${product.image.startsWith('http')
                ? `<img src="${product.image}" alt="${product.name}">`
                : `<i class="${product.image}"></i>`}
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
            // Parse price: Remove "Rp", dots, and spaces
            const priceVal = parseFloat(item.price.replace(/[^0-9]/g, ''));
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

    // Format total to IDR currency format
    totalPriceEl.innerText = 'Rp ' + total.toLocaleString('id-ID');
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
