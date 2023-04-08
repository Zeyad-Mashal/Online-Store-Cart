// Cart 
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let removecart = document.querySelector("#close-cart");

// open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}
// close cart
removecart.onclick = () => {
    cart.classList.remove("active");
}

// cart working
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

//making function
function ready() {
    // remove items from cart
    let removeCartButton = document.getElementsByClassName('cart-remove')
    console.log(removeCartButton)
    for (let i = 0; i < removeCartButton.length; i++ ) {

        let button = removeCartButton[i]
        button.addEventListener("click", removeCartItem)
    }
    // Quantity Changes
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", changeQuantity);
    }

    // Add To Cart
    let addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button 
    document.getElementsByClassName("buy-btn")[0].addEventListener("click", buyButtonClicked);
}
// Buy Function Work
function buyButtonClicked (e) {
    alert ("Your order has Deliverd Thanks To Buy From Us Have A  Good Day.");
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}




function removeCartItem(e) {
    let btnClicked = e.target
    btnClicked.parentElement.remove();
    updateTotal();
}

// Change Quantity 
function changeQuantity (e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add To Cart
function addCartClicked (e) {
    let button = e.target;
    let shopproducts = button.parentElement;
    let title = shopproducts.getElementsByClassName("pro-title")[0].innerText;
    let price = shopproducts.getElementsByClassName("price")[0].innerText;
    let proImg = shopproducts.getElementsByClassName("img")[0].src;
    addProductToCart(title, price, proImg);
    updateTotal();
}

function addProductToCart(title, price, proImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-pro-title");
    for (i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You Have Aleary Add This item To Cart");
            return;
        }
}

let cartBoxContent = `
        <img src="${proImg}" class="cart-img">
        <div class="details-box">
            <div class="cart-pro-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
<!-- remove -->
    <i class="fa-solid fa-trash cart-remove"></i>`


cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", changeQuantity);
}

// update total
function updateTotal () {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxs = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for (let i = 0; i < cartBoxs.length; i++ ) {
        let cartBox = cartBoxs[i];
        let priceEle = cartBox.getElementsByClassName("cart-price")[0];
        let quantityEle = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceEle.innerText.replace("$", ""));
        let quantity = quantityEle.value;
        total = total + price * quantity;
    }
        // if price contains some cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
}