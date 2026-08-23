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
  { id: 16, name: "Ube Halaya Frappe", category: "Drinks", description: "A creamy frappe inspired by ube halaya.", ingredients: "Ube halaya, milk, ice, and whipped cream.", allergens: "Contains dairy.", price: 100, image: "images/Ube Halaya Frappe.jpeg" },
  { id: 17, name: "Ube Macapuno Tart", category: "Dessert", description: "A tender tart inspired by ube and macapuno.", price: 145, image: "images/Ube Macapuno Tart.jpeg" }
];

// TEAM MEMBER DATA
const teamMembers = [
  { name: "Paul Bonifacio", initials: "PB", role: "Web Developer", description: "Builds and maintains the digital experience behind Cozy & Beyond." },
  { name: "Angelo Dingalan", initials: "AD", role: "UI/UX Designer", description: "Designs intuitive interfaces that make the café experience simple and enjoyable." },
  { name: "Chloe Tante", initials: "CT", role: "Content & Marketing Manager", description: "Shapes the brand's voice, content, and marketing presence." },
  { name: "Jennylie Llaneta", initials: "JL", role: "Product & Menu Manager", description: "Curates the menu and ensures every product fits the Cozy & Beyond experience." },
  { name: "Katrina Doma", initials: "KD", role: "Quality Assurance & Documentation", description: "Ensures quality, consistency, and proper documentation across the project." }
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
const itemIngredients = (item) => item.ingredients || 'Locally inspired ingredients prepared fresh for each order.';
const itemAllergens = (item) => item.allergens || (item.category === 'Coffee' || item.category === 'Drinks' ? 'May contain dairy.' : 'May contain dairy, wheat, eggs, or nuts. Please ask our team about ingredients.');
const itemSizes = (item) => item.category === 'Coffee' || item.category === 'Drinks' ? ['Small', 'Medium', 'Large'] : ['Regular'];
const itemAddOns = (item) => item.category === 'Coffee' || item.category === 'Drinks' ? [['Extra shot', 30], ['Whipped cream', 20], ['Pandan jelly', 25]] : [['Extra rice', 30], ['Garlic crumbs', 15], ['Atchara', 20]];
function renderMenu() {
  if (!menuGrid) return;
  const query = searchTerm.trim().toLowerCase();
  const visibleItems = menuItems.filter((item) => (activeCategory === 'All' || item.category === activeCategory) && (!query || `${item.name} ${item.description}`.toLowerCase().includes(query)));
  menuGrid.innerHTML = visibleItems.map((item) => { const quantity = getCartQuantity(item.id); return `<article class="menu-card" data-item-id="${item.id}"><img src="${item.image}" alt="${item.name}" loading="lazy"><div class="menu-card-content"><span class="menu-category">${item.category}</span><h3>${item.name}</h3><p>${item.description}</p><span class="price item-price" data-base-price="${item.price}">${formatPrice(item.price)}</span><div class="menu-card-actions"><button class="secondary-btn view-details" type="button" data-item-id="${item.id}">View details</button><button class="primary-btn add-to-cart" type="button" data-item-id="${item.id}">${quantity ? `Added to Cart (${quantity})` : 'Add to Cart'}</button></div></div></article>`; }).join('');
  if (menuResultNote) menuResultNote.textContent = visibleItems.length ? `Showing ${visibleItems.length} item${visibleItems.length === 1 ? '' : 's'}` : 'No menu items match your search.';
}
filterButtons.forEach((button) => button.addEventListener('click', () => { activeCategory = button.dataset.category; filterButtons.forEach((item) => item.classList.toggle('active', item === button)); renderMenu(); }));
menuSearchInput?.addEventListener('input', (event) => { searchTerm = event.target.value; renderMenu(); });

// TEAM MEMBER UI
const teamGrid = document.getElementById('team-grid');
if (teamGrid) {
  teamGrid.innerHTML = teamMembers.map((member) => `<article class="team-card"><span class="team-mark" aria-hidden="true">${member.initials}</span><h3>${member.name}</h3><p class="team-role">${member.role}</p><p>${member.description}</p></article>`).join('');
}

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
function addToCart(id, customization = {}) { const item = menuItems.find((menuItem) => menuItem.id === Number(id)); if (!item) return; const size = customization.size || 'Standard'; const temperature = customization.temperature || ''; const addOns = customization.addOns || []; const addOnTotal = addOns.reduce((total, addOn) => total + Number(addOn.price), 0); const price = item.price + (size === 'Large' ? 30 : size === 'Small' ? -20 : 0) + addOnTotal; const addOnNames = addOns.map((addOn) => addOn.name); const cartId = `${item.id}-${size}-${temperature}-${addOnNames.join('-')}`; const existing = cart.find((cartItem) => cartItem.id === cartId); if (existing) existing.quantity += customization.quantity || 1; else cart.push({ ...item, id: cartId, baseId: item.id, name: [item.name, size !== 'Standard' ? size : '', temperature, addOnNames.length ? `+ ${addOnNames.join(', ')}` : ''].filter(Boolean).join(' | '), price, quantity: customization.quantity || 1 }); renderCart(); renderMenu(); }
const itemModal = document.getElementById('item-modal');
const itemModalContent = document.getElementById('item-modal-content');
function openItemModal(id) {
  const item = menuItems.find((menuItem) => menuItem.id === Number(id));
  if (!item || !itemModal || !itemModalContent) return;
  const sizes = itemSizes(item); const addOns = itemAddOns(item);
  itemModalContent.innerHTML = `<div class="item-detail"><img src="${item.image}" alt="${item.name}"><div class="item-detail-copy"><span class="menu-category">${item.category}</span><h2 id="item-modal-title">${item.name} — ${formatPrice(item.price)}</h2><p>${item.description}</p><dl class="item-facts"><div><dt>Ingredients</dt><dd>${itemIngredients(item)}</dd></div><div><dt>Allergens</dt><dd>${itemAllergens(item)}</dd></div></dl><div class="detail-options"><label>Size<select id="detail-size">${sizes.map((size) => `<option value="${size}">${size}${size === 'Large' ? ' (+₱30)' : size === 'Small' ? ' (-₱20)' : ''}</option>`).join('')}</select></label>${item.category === 'Coffee' ? '<label>Temperature<select id="detail-temperature"><option value="Hot">Hot</option><option value="Iced">Iced</option></select></label>' : ''}<fieldset><legend>Add-ons</legend>${addOns.map(([name, price]) => `<label class="checkbox-option"><input type="checkbox" value="${name}" data-addon-price="${price}"> ${name} (+₱${price})</label>`).join('')}</fieldset><label>Quantity<input id="detail-quantity" type="number" value="1" min="1" max="20"></label></div><button class="primary-btn detail-add" id="detail-add-to-cart" type="button">Add to Cart</button></div></div>`;
  itemModal.classList.add('open'); itemModal.setAttribute('aria-hidden', 'false');
}
function closeItemModal() { itemModal?.classList.remove('open'); itemModal?.setAttribute('aria-hidden', 'true'); }
document.getElementById('close-item-modal')?.addEventListener('click', closeItemModal);
itemModal?.addEventListener('click', (event) => { if (event.target === itemModal) closeItemModal(); const button = event.target.closest('#detail-add-to-cart'); if (!button) return; const itemId = itemModalContent.querySelector('#item-modal-title')?.textContent.split(' — ')[0]; const item = menuItems.find((menuItem) => menuItem.name === itemId); if (!item) return; const selectedAddOns = [...itemModalContent.querySelectorAll('[data-addon-price]:checked')].map((input) => ({ name: input.value, price: input.dataset.addonPrice })); addToCart(item.id, { size: itemModalContent.querySelector('#detail-size')?.value, temperature: itemModalContent.querySelector('#detail-temperature')?.value, addOns: selectedAddOns, quantity: Number(itemModalContent.querySelector('#detail-quantity')?.value) || 1 }); closeItemModal(); });
menuGrid?.addEventListener('click', (event) => { const detailsButton = event.target.closest('.view-details'); if (detailsButton) { openItemModal(detailsButton.dataset.itemId); return; } const button = event.target.closest('.add-to-cart'); if (button) { addToCart(button.dataset.itemId); return; } if (event.target.closest('.menu-card')) openItemModal(event.target.closest('.menu-card').dataset.itemId); });
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
  const orderNumber = `CB-${Math.floor(1000 + Math.random() * 9000)}`;
  const confirmation = document.getElementById('order-confirmation'); confirmation.innerHTML = `<p class="eyebrow accent">Order received</p><h3>Thank you, ${name}!</h3><p class="order-number">Order #${orderNumber}</p><p class="prep-time">Estimated preparation time: <strong>15–25 minutes</strong></p><p>Delivery address: ${address}</p>${cart.map((item) => `<p>${item.quantity} × ${item.name}</p>`).join('')}<p class="price">Total: ${formatPrice(cartTotalValue())}</p><p>Please wait while your order is prepared. This confirmation is local to this website and has not been sent to the restaurant.</p><button class="primary-btn" id="new-order" type="button">Start New Order</button>`; checkoutForm.hidden = true; confirmation.hidden = false;
  document.getElementById('new-order').addEventListener('click', () => { cart = []; checkoutForm.reset(); checkoutForm.hidden = true; confirmation.hidden = true; renderCart(); });
});

// GALLERY AND CONTACT
const lightbox = document.getElementById('lightbox'); const lightboxImage = lightbox?.querySelector('img');
function closeLightbox() { lightbox?.classList.remove('open'); lightbox?.setAttribute('aria-hidden', 'true'); }
document.querySelectorAll('.gallery-item img').forEach((image) => image.addEventListener('click', () => { lightboxImage.src = image.src; lightboxImage.alt = image.alt; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); }));
document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox); lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (event) => { event.preventDefault(); const message = document.getElementById('form-message'); const name = document.getElementById('full-name').value.trim(); const email = document.getElementById('email').value.trim(); const body = document.getElementById('message').value.trim(); if (!name || !email || !body) { message.textContent = 'Please fill in your full name, email, and message.'; message.className = 'form-message error'; return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { message.textContent = 'Please enter a valid email address.'; message.className = 'form-message error'; return; } message.textContent = 'Thank you for reaching out to Cozy & Beyond!'; message.className = 'form-message success'; contactForm.reset(); });
const reservationForm = document.getElementById('reservation-form');
reservationForm?.addEventListener('submit', (event) => { event.preventDefault(); const formData = new FormData(reservationForm); const message = document.getElementById('reservation-message'); if (![...formData.entries()].every(([key, value]) => key === 'request' || String(value).trim())) { message.textContent = 'Please complete the required reservation details.'; message.className = 'form-message error'; return; } message.textContent = `Thank you, ${formData.get('name')}. Your reservation request for ${formData.get('guests')} guest(s) on ${formData.get('date')} at ${formData.get('time')} has been noted locally. Please call us to confirm.`; message.className = 'form-message success'; reservationForm.reset(); });
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');
reviewForm?.addEventListener('submit', (event) => { event.preventDefault(); const formData = new FormData(reviewForm); const message = document.getElementById('review-message'); const name = String(formData.get('name') || '').trim(); const rating = Number(formData.get('rating')); const review = String(formData.get('review') || '').trim(); if (!name || !rating || !review) { message.textContent = 'Please add your name, rating, and review.'; message.className = 'form-message error'; return; } const card = document.createElement('article'); card.className = 'review-card'; const stars = document.createElement('div'); stars.className = 'review-stars'; stars.setAttribute('aria-label', `${rating} out of 5 stars`); stars.textContent = `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`; const quote = document.createElement('blockquote'); quote.textContent = review; const author = document.createElement('p'); author.className = 'review-author'; author.textContent = name; card.append(stars, quote, author); reviewsList?.querySelector('.empty-reviews')?.remove(); reviewsList?.prepend(card); message.textContent = 'Thank you for sharing your experience.'; message.className = 'form-message success'; reviewForm.reset(); });

renderMenu(); renderCart(); showSection(document.getElementById(window.location.hash.replace('#', '')) ? window.location.hash.replace('#', '') : 'home');
