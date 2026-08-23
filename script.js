// MENU DATA
const menuItems = [
  { id: 1, name: "Adobo sa Gata Lumpia Bowl", category: "Food", description: "Crisp lumpia and adobo flavors with coconut cream.", price: 149, image: "images/Adobo sa Gata Lumpia Bowl.jpeg" },
  { id: 2, name: "Bangus Sisig", category: "Food", description: "A flavorful Filipino-style bangus dish.", price: 150, image: "images/Bangus Sisig.jpeg" },
  { id: 3, name: "Cheesy Adobo Pasta", category: "Food", description: "A creamy and savory adobo-inspired pasta.", price: 145, image: "images/Cheesy Adobo Pasta.jpeg" },
  { id: 4, name: "Cocopandan Cold Brew", category: "Coffee", description: "Cold brew with coconut and fragrant pandan.", price: 120, image: "images/Cocopandan Cold Brew.jpeg" },
  { id: 5, name: "Crispy Pata", category: "Food", description: "A hearty Filipino favorite with a crisp finish.", price: 149, image: "images/Crispy Pata.jpeg" },
  { id: 6, name: "Flan Brulee Latte", category: "Coffee", description: "A creamy coffee drink with flan-inspired flavor.", price: 160, image: "images/Flan Brulee Latte.jpeg" },
  { id: 7, name: "Honey Glazed Chicken Bowl", category: "Food", description: "Tender chicken finished with a sweet honey glaze.", price: 199, image: "images/Honey Glazed Chicken Bowl.jpeg" },
  { id: 8, name: "Kare Kare Bites", category: "Food", description: "Savory, peanut-rich bites inspired by kare kare.", price: 99, image: "images/Kare Kare Bites.jpeg" },
  { id: 9, name: "Mango Meringue Cheesecake", category: "Dessert", description: "Creamy cheesecake brightened with mango and meringue.", price: 180, image: "images/Mango Meringue Cheesecake.jpeg" },
  { id: 10, name: "Mango Nata De Coco", category: "Drinks", description: "A chilled mango drink with chewy nata de coco.", price: 130, image: "images/Mango Nata De Coco.jpeg" },
  { id: 11, name: "Pili Cinnamon Roll", category: "Dessert", description: "A warm cinnamon roll with toasted pili nuts.", price: 120, image: "images/Pili Cinnamon Roll.jpeg" },
  { id: 12, name: "Queso De Bola Crepe Cake", category: "Dessert", description: "Delicate crepes layered with queso de bola flavor.", price: 165, image: "images/Queso De Bola Crepe Cake.jpeg" },
  { id: 13, name: "Sisig Carbonara", category: "Food", description: "Rich carbonara inspired by beloved sisig flavors.", price: 159, image: "images/Sisig Carbonara.jpeg" },
  { id: 14, name: "Table And Taho Macchiato", category: "Coffee", description: "A layered coffee inspired by tablea and taho.", price: 125, image: "images/Table And Taho Macchiato.jpeg" },
  { id: 15, name: "Tablea Tiramisu", category: "Dessert", description: "Filipino-inspired tiramisu featuring tablea.", price: 150, image: "images/Tablea Tiramisu.jpeg" },
  { id: 16, name: "Ube Halaya Frappe", category: "Drinks", description: "A creamy frappe inspired by ube halaya.", price: 160, image: "images/Ube Halaya Frappe.jpeg" },
  { id: 17, name: "Ube Macapuno Tart", category: "Dessert", description: "A tender tart inspired by ube and macapuno.", price: 145, image: "images/Ube Macapuno Tart.jpeg" }
];

// TEAM MEMBER DATA
const teamMembers = [
  { name: "Paul Bonifacio", role: "Web Developer", description: "A member of the Cozy & Beyond team." },
  { name: "Angelo Dingalan", role: "UI/UX Designer", description: "A member of the Cozy & Beyond team." },
  { name: "Chloie Tante", role: "Content & Marketing Manager", description: "A member of the Cozy & Beyond team." },
  { name: "Jennylie Llaneta", role: "Product & Menu Manager", description: "A member of the Cozy & Beyond team." },
  { name: "Katrina Doma", role: "Quality Assurance & Documentation", description: "A member of the Cozy & Beyond team." }
];

// PAGE NAVIGATION
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const navButtons = document.querySelectorAll('.nav-button');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const backToTopButton = document.querySelector('.back-to-top');
function showSection(targetId) {
  sections.forEach((section) => { const active = section.id === targetId; section.classList.toggle('active', active); section.hidden = !active; });
  navLinks.forEach((link) => link.classList.toggle('active', link.dataset.page === targetId));
  navMenu?.classList.remove('open'); navToggle?.classList.remove('open'); navToggle?.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
navLinks.forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); showSection(link.dataset.page); }));
navButtons.forEach((button) => button.addEventListener('click', () => showSection(button.dataset.page)));
navToggle?.addEventListener('click', () => { const open = navMenu.classList.toggle('open'); navToggle.classList.toggle('open', open); navToggle.setAttribute('aria-expanded', String(open)); });
window.addEventListener('scroll', () => backToTopButton?.classList.toggle('visible', window.scrollY > 320));
backToTopButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// MENU FUNCTIONS
const menuGrid = document.getElementById('menu-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuSearchInput = document.getElementById('menu-search');
const menuResultNote = document.getElementById('menu-result-note');
let activeCategory = 'All'; let searchTerm = '';
const formatPrice = (price) => `₱${price.toLocaleString('en-PH')}`;
function renderMenu() {
  if (!menuGrid) return;
  const query = searchTerm.trim().toLowerCase();
  const visibleItems = menuItems.filter((item) => (activeCategory === 'All' || item.category === activeCategory) && (!query || `${item.name} ${item.description}`.toLowerCase().includes(query)));
  menuGrid.innerHTML = visibleItems.map((item) => { const quantity = getCartQuantity(item.id); return `<article class="menu-card"><img src="${item.image}" alt="${item.name}" loading="lazy"><div class="menu-card-content"><span class="menu-category">${item.category}</span><h3>${item.name}</h3><p>${item.description}</p>${item.category === 'Coffee' ? `<div class="customization"><label>Size<select class="drink-size"><option value="Small">Small</option><option value="Medium" selected>Medium</option><option value="Large">Large (+₱30)</option></select></label><label>Temperature<select class="drink-temperature"><option value="Hot">Hot</option><option value="Iced">Iced</option></select></label></div>` : ''}<span class="price item-price" data-base-price="${item.price}">${formatPrice(item.price)}</span><button class="primary-btn add-to-cart" type="button" data-item-id="${item.id}">${quantity ? `Added to Cart (${quantity})` : 'Add to Cart'}</button></div></article>`; }).join('');
  if (menuResultNote) menuResultNote.textContent = visibleItems.length ? `Showing ${visibleItems.length} item${visibleItems.length === 1 ? '' : 's'}` : 'No menu items match your search.';
}
filterButtons.forEach((button) => button.addEventListener('click', () => { activeCategory = button.dataset.category; filterButtons.forEach((item) => item.classList.toggle('active', item === button)); renderMenu(); }));
menuSearchInput?.addEventListener('input', (event) => { searchTerm = event.target.value; renderMenu(); });

// TEAM MEMBER UI
const teamGrid = document.getElementById('team-grid');
if (teamGrid) teamGrid.innerHTML = teamMembers.map((member) => `<article class="team-card"><span class="team-mark">C&amp;B</span><h3>${member.name}</h3><p class="team-role">${member.role}</p><p>${member.description}</p></article>`).join('');

// CART FUNCTIONS
let cart = [];
const cartOverlay = document.getElementById('cart-overlay'); const cartItems = document.getElementById('cart-items'); const cartCount = document.getElementById('cart-count'); const cartTotal = document.getElementById('cart-total');
const checkoutForm = document.getElementById('checkout-form'); const orderSummary = document.getElementById('order-summary'); const checkoutMessage = document.getElementById('checkout-message');
const cartTotalValue = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
const getCartQuantity = (itemId) => cart.reduce((total, item) => total + (item.baseId === itemId ? item.quantity : 0), 0);
function renderCart() {
  const count = cart.reduce((total, item) => total + item.quantity, 0); if (cartCount) cartCount.textContent = count; if (cartTotal) cartTotal.textContent = formatPrice(cartTotalValue());
  if (!cartItems) return;
  cartItems.innerHTML = cart.length ? cart.map((item) => `<article class="cart-item"><img src="${item.image}" alt="${item.name}"><div><h3>${item.name}</h3><p>${formatPrice(item.price)} each</p><div class="quantity-controls"><button type="button" data-cart-action="decrease" data-item-id="${item.id}" aria-label="Decrease ${item.name}">−</button><strong>${item.quantity}</strong><button type="button" data-cart-action="increase" data-item-id="${item.id}" aria-label="Increase ${item.name}">+</button><button class="remove-item" type="button" data-cart-action="remove" data-item-id="${item.id}">Remove</button></div></div></article>`).join('') : '<p class="empty-cart">Your cart is empty.</p>';
  if (orderSummary) orderSummary.innerHTML = cart.map((item) => `<p><span>${item.quantity} × ${item.name}</span><strong>${formatPrice(item.price * item.quantity)}</strong></p>`).join('') + `<div class="summary-total"><span>Total</span><strong>${formatPrice(cartTotalValue())}</strong></div>`;
}
function addToCart(id, customization = {}) { const item = menuItems.find((menuItem) => menuItem.id === Number(id)); if (!item) return; const size = customization.size || 'Standard'; const temperature = customization.temperature || ''; const price = item.price + (size === 'Large' ? 30 : size === 'Small' ? -20 : 0); const cartId = `${item.id}-${size}-${temperature}`; const existing = cart.find((cartItem) => cartItem.id === cartId); if (existing) existing.quantity += 1; else cart.push({ ...item, id: cartId, baseId: item.id, name: temperature ? `${item.name} (${size}, ${temperature})` : item.name, price, quantity: 1 }); renderCart(); renderMenu(); }
menuGrid?.addEventListener('change', (event) => { if (!event.target.matches('.drink-size')) return; const card = event.target.closest('.menu-card'); const price = Number(card.querySelector('.item-price').dataset.basePrice) + (event.target.value === 'Large' ? 30 : event.target.value === 'Small' ? -20 : 0); card.querySelector('.item-price').textContent = formatPrice(price); });
menuGrid?.addEventListener('click', (event) => { const button = event.target.closest('.add-to-cart'); if (!button) return; const card = button.closest('.menu-card'); addToCart(button.dataset.itemId, { size: card.querySelector('.drink-size')?.value, temperature: card.querySelector('.drink-temperature')?.value }); });
cartItems?.addEventListener('click', (event) => { const button = event.target.closest('[data-cart-action]'); if (!button) return; const item = cart.find((cartItem) => String(cartItem.id) === button.dataset.itemId); if (!item) return; if (button.dataset.cartAction === 'increase') item.quantity += 1; if (button.dataset.cartAction === 'decrease') item.quantity -= 1; if (button.dataset.cartAction === 'remove' || item.quantity < 1) cart = cart.filter((cartItem) => cartItem.id !== item.id); renderCart(); renderMenu(); });

// CHECKOUT AND ORDER CONFIRMATION
function openCart() { cartOverlay?.classList.add('open'); cartOverlay?.setAttribute('aria-hidden', 'false'); }
function closeCart() { cartOverlay?.classList.remove('open'); cartOverlay?.setAttribute('aria-hidden', 'true'); }
document.getElementById('open-cart')?.addEventListener('click', openCart); document.getElementById('close-cart')?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', (event) => { if (event.target === cartOverlay) closeCart(); });
document.getElementById('clear-cart')?.addEventListener('click', () => { cart = []; if (checkoutForm) checkoutForm.hidden = true; renderCart(); renderMenu(); });
document.getElementById('checkout-button')?.addEventListener('click', () => { checkoutMessage.textContent = cart.length ? '' : 'Your cart is empty.'; checkoutMessage.className = cart.length ? 'form-message' : 'form-message error'; if (cart.length) checkoutForm.hidden = false; });
checkoutForm?.addEventListener('submit', (event) => {
  event.preventDefault(); const name = document.getElementById('order-name').value.trim(); const address = document.getElementById('order-address').value.trim(); const phone = document.getElementById('order-phone').value.trim();
  if (!cart.length) { checkoutMessage.textContent = 'Your cart is empty.'; checkoutMessage.className = 'form-message error'; return; }
  if (!name) { checkoutMessage.textContent = 'Please enter your name.'; checkoutMessage.className = 'form-message error'; return; }
  if (!address) { checkoutMessage.textContent = 'Please enter your delivery address.'; checkoutMessage.className = 'form-message error'; return; }
  if (!phone) { checkoutMessage.textContent = 'Please enter your phone number.'; checkoutMessage.className = 'form-message error'; return; }
  const confirmation = document.getElementById('order-confirmation'); confirmation.innerHTML = `<p class="eyebrow accent">Order received</p><h3>Thank you, ${name}!</h3><p>Delivery address: ${address}</p>${cart.map((item) => `<p>${item.quantity} × ${item.name}</p>`).join('')}<p class="price">Total: ${formatPrice(cartTotalValue())}</p><p>Please wait while your order is prepared. This confirmation is local to this website and has not been sent to the restaurant.</p><button class="primary-btn" id="new-order" type="button">Start New Order</button>`; checkoutForm.hidden = true; confirmation.hidden = false;
  document.getElementById('new-order').addEventListener('click', () => { cart = []; checkoutForm.reset(); checkoutForm.hidden = true; confirmation.hidden = true; renderCart(); });
});

// GALLERY AND CONTACT
const lightbox = document.getElementById('lightbox'); const lightboxImage = lightbox?.querySelector('img');
function closeLightbox() { lightbox?.classList.remove('open'); lightbox?.setAttribute('aria-hidden', 'true'); }
document.querySelectorAll('.gallery-item img').forEach((image) => image.addEventListener('click', () => { lightboxImage.src = image.src; lightboxImage.alt = image.alt; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); }));
document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox); lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (event) => { event.preventDefault(); const message = document.getElementById('form-message'); const name = document.getElementById('full-name').value.trim(); const email = document.getElementById('email').value.trim(); const body = document.getElementById('message').value.trim(); if (!name || !email || !body) { message.textContent = 'Please fill in your full name, email, and message.'; message.className = 'form-message error'; return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { message.textContent = 'Please enter a valid email address.'; message.className = 'form-message error'; return; } message.textContent = 'Thank you for reaching out to Cozy & Beyond!'; message.className = 'form-message success'; contactForm.reset(); });

renderMenu(); renderCart(); showSection(document.getElementById(window.location.hash.replace('#', '')) ? window.location.hash.replace('#', '') : 'home');
