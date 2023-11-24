// Constants
const PRODUCT_PRICE = 125;
const PRODUCT_NAME = "Fall Limited Edition Sneakers";
const THUMBNAIL_BASE_SRC = "images/image-product-1-thumbnail.jpg";

// Selectors
const selectors = {
	primaryNavigationEl: document.querySelector(".nav"),
	hamburgerIconEl: document.querySelector(".hamburger-icon"),
	navCloseIconEl: document.querySelector(".nav__close-icon"),
	cartIconEl: document.querySelector(".cart__icon"),
	cartBoxEl: document.querySelector(".cart-box"),
	cartBoxContentEl: document.querySelector(".cart-box__content"),
	cartCountEl: document.querySelector(".cart__count"),
	heroImageEl: document.querySelector(".product-container__hero-img"),
	thumbnailContainerEl: document.querySelector(".thumbnail-container"),
	thumbnailImgs: document.querySelectorAll(".thumbnail__img"),
	quantitySelectorEl: document.querySelector(".quantity-selector"),
	quantitySelectorCountEl: document.querySelector(
		".quantity-selector__count"
	),
	btnAddToCartEl: document.querySelector(".btn--add-to-cart"),
	btnPrevEl: document.querySelector(".btn--prev"),
	btnNextEl: document.querySelector(".btn--next"),
};

// Data
const HERO_IMAGES = [
	"images/image-product-1.jpg",
	"images/image-product-2.jpg",
	"images/image-product-3.jpg",
	"images/image-product-4.jpg",
];

// State
let currentImageIndex = 1;
let currentQuantity = 0;

// Functions
function getEmptyCartMessage() {
	return '<h4 class="cart-box__empty-message">Your cart is empty.</h4>';
}

function renderCartItem(productName, thumbnailSrc, unitPrice, quantity) {
	return `
    <div class="cart-item cart-item--hide padding-1-5em">
      <div class="d-flex items-center gap-1 mb-1-5em">
        <img src="${thumbnailSrc}" alt="Product Thumbnail" class="cart-item__img" />
        <div class="cart-item__content">
          <h2 class="cart-item__header mb-5">${productName}</h2>
          <p class="cart-item__price">
            <span class="cart-item__unit-price">&dollar;${unitPrice.toFixed(
				2
			)}</span>
            &times;
            <span class="quantity">${quantity}</span>
            <span class="cart-item__final-price"><strong>&dollar;${(
				unitPrice * quantity
			).toFixed(2)}</strong></span>
          </p>
        </div>
        <button class="btn btn--delete cursor-pointer">
          <img src="./images/icon-delete.svg" alt="Delete Icon" class="delete-icon" />
        </button>
      </div>
      <button class="btn btn--primary btn--lg">Checkout</button>
    </div>
  `;
}

function showEmptyCartMessage() {
	if (currentQuantity === 0) {
		selectors.cartCountEl.classList.add("cart__count--hide");
		selectors.cartBoxContentEl.innerHTML = getEmptyCartMessage();
	}
}

function showCartItem() {
	selectors.cartBoxContentEl.innerHTML = renderCartItem(
		PRODUCT_NAME,
		THUMBNAIL_BASE_SRC,
		PRODUCT_PRICE,
		currentQuantity
	);
}

function addZIndexClass(element) {
	element.classList.add("z-index-2");
}

function removeZIndexClass(element) {
	element.classList.remove("z-index-2");
}

// Event Handlers
function toggleNavActive() {
	const isNavActive =
		selectors.primaryNavigationEl.classList.contains("nav--active");

	if (isNavActive) {
		selectors.primaryNavigationEl.classList.remove("nav--active");
		removeZIndexClass(selectors.btnNextEl);
		removeZIndexClass(selectors.btnPrevEl);
	} else {
		selectors.primaryNavigationEl.classList.add("nav--active");
		addZIndexClass(selectors.btnNextEl);
		addZIndexClass(selectors.btnPrevEl);
	}
}

function toggleCartBox() {
	selectors.cartBoxEl.classList.toggle("cart-box--hide");
}

function updateImage(direction) {
	currentImageIndex =
		direction === "prev"
			? currentImageIndex === 0
				? HERO_IMAGES.length - 1
				: currentImageIndex - 1
			: currentImageIndex === HERO_IMAGES.length - 1
			? 0
			: currentImageIndex + 1;
	selectors.heroImageEl.src = HERO_IMAGES[currentImageIndex];
}

function handleThumbnailContainerClick(e) {
	const clickedThumbnailImg = e.target.classList.contains("thumbnail__img");

	if (clickedThumbnailImg) {
		const thumbnailImg = e.target;
		handleThumbnailClick(thumbnailImg);
	}
}

function handleThumbnailClick(thumbnailImg) {
	const { src } = thumbnailImg.dataset;

	selectors.thumbnailImgs.forEach((img) =>
		img.classList.remove("thumbnail__img--active")
	);

	selectors.heroImageEl.src = src;
	thumbnailImg.classList.add("thumbnail__img--active");
}

function handleQuantityButtonClick(e) {
	const isAddBtnEl = e.target.classList.contains(
		"quantity-selector__btn--add"
	);
	const isMinusBtnEl = e.target.classList.contains(
		"quantity-selector__btn--minus"
	);

	if (isAddBtnEl) {
		currentQuantity =
			currentQuantity === 10 ? currentQuantity : currentQuantity + 1;
	}

	if (currentQuantity === 0) {
		showEmptyCartMessage();
		return;
	}

	if (isMinusBtnEl) {
		currentQuantity =
			currentQuantity === 0 ? currentQuantity : currentQuantity - 1;
	}

	showCartItem();
	selectors.cartCountEl.classList.remove("cart__count--hide");
	selectors.cartCountEl.textContent = currentQuantity;
	selectors.quantitySelectorCountEl.textContent = currentQuantity;
	document.querySelector(".cart-item").classList.remove("cart-item--hide");
}

// Event Listeners
selectors.hamburgerIconEl.addEventListener("click", toggleNavActive);
selectors.navCloseIconEl.addEventListener("click", toggleNavActive);

selectors.cartIconEl.addEventListener("click", toggleCartBox);

selectors.btnPrevEl.addEventListener("click", () => updateImage("prev"));
selectors.btnNextEl.addEventListener("click", () => updateImage("next"));

selectors.thumbnailContainerEl.addEventListener(
	"click",
	handleThumbnailContainerClick
);

selectors.quantitySelectorEl.addEventListener(
	"click",
	handleQuantityButtonClick
);

selectors.btnAddToCartEl.addEventListener("click", () => {
	if (currentQuantity === 0) {
		alert("Add an item...");
	} else {
		showCartItem();
		selectors.cartCountEl.classList.remove("cart__count--hide");
		selectors.cartCountEl.textContent = currentQuantity;
		document
			.querySelector(".cart-item")
			.classList.remove("cart-item--hide");
	}
});

selectors.quantitySelectorCountEl.textContent = currentQuantity;

// Initial setup
showEmptyCartMessage();
