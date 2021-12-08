if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}


function ready() {
    const addToCartButton = document.querySelectorAll('.add-to-cart');
    const increasePrice = document.querySelectorAll('.increase-price');

    addToCartButton.forEach(button => {
        button.addEventListener('click', addItmesToCart);
    });

    increasePrice.forEach(button => {
        button.addEventListener('click', increaseCartPrice);
    })
}


function addItmesToCart(e) {
    let button = e.target;
    let cartAmountContainer = document.querySelector('.total-container');
    cartAmountContainer.style.display = 'block';
    button.style.backgroundColor = 'black';
    button.innerText = 'In Cart';
    let emptyCartMessage = document.querySelector('.empty-cart-message');
    emptyCartMessage.classList.add('hide');
    
    let element = button.parentElement;
    let title = element.querySelector('.name').innerText;
    let price = element.querySelector('.price').innerText;
    let imageSrc = element.previousElementSibling.querySelector('.recipe-img').src;
    generateContent(title, price, imageSrc);
    updateGrandTotal();
}

function generateContent(name, price, image) {
    let div = document.createElement('div');
    div.classList.add('cart-item');
    let yourCartContainer = document.querySelector('.your-cart-items-section');
    let allItemsNames = yourCartContainer.querySelectorAll('.name');

    for(let i = 0; i < allItemsNames.length; i++) {
        if(allItemsNames[i].innerText === name) {
            alert('Item is already added to the cart!');
            return;
        }
    }
    let content = generateHTML(name, price, image);
    div.innerHTML = content;               
    yourCartContainer.appendChild(div);
    let updatedPriceValueButton = div.querySelectorAll('.update-price-value');
    updatedPriceValueButton.forEach(button => {
        button.addEventListener('click', updateCartItemQuantity);
    })          
}

function updateCartItemQuantity(event) {
    let button = event.target;
    let parent = button.parentElement.parentElement;
    let recipeCount = parent.parentElement.parentElement.parentElement.querySelector('.recipe-count');
    let price = parent.parentElement.parentElement.querySelector('.price').innerText.replace('$', '');
    let totalPriceForCart = parent.parentElement.querySelector('.updated-price');
    let quantityToChange = parent.querySelector('.quantity');
    if(event.target.dataset.id === 'plus') {
        quantityToChange.innerText = Number(quantityToChange.innerText) + 1;
    } else {
        if(Number(quantityToChange.innerText) <= 1) return;
        quantityToChange.innerText = Number(quantityToChange.innerText) - 1;
    }
    totalPriceForCart.innerText = updateTotalPrice(price, quantityToChange.innerText);
    recipeCount.innerText = quantityToChange.innerText;
    updateGrandTotal();
}

function updateTotalPrice(price, quantity) {
    let currentTotal =  Number(price) * Number(quantity);
    return `$${(currentTotal).toFixed(2)}`;
}

function updateGrandTotal() {
    let subtotal = document.querySelector('.subtotal');
    let tax = document.querySelector('.tax');
    let grandTotal = document.querySelector('.total');
    let allCartItems = document.querySelectorAll('.cart-item');
    let value = 0;
    allCartItems.forEach(item => {
        let price = item.querySelector('.price').innerText.replace('$', '');
        let quantity = item.querySelector('.quantity').innerText;
        value += Number(price) * Number(quantity);
    })
    let taxValue = value * 0.0975;
    tax.innerText = `$${taxValue.toFixed(2)}`;
    subtotal.innerText = `$${value.toFixed(2)}`;
    grandTotal.innerText = `$${(value + taxValue).toFixed(2)}`
}

function generateHTML(name, price, image) {
    return `<div class="image">
                <img class="cart-recipe-img" src=${image} alt="French Fries">
                <p class="recipe-count">1</p>
            </div>
            <div class="cart-description">
                <p class="name">${name}</p>
                <p class="price">${price}</p>
                <div class="select-area">
                    <div class="select-quantity">
                        <button class="decrease-price update-price-value">
                            <img src="/STARTER-FILES/images/chevron.svg" alt="" class="minus" data-id="minus">
                        </button>
                        <p class="quantity" data-id="1" data-value=${price}>1</p>
                        <button class="increase-price update-price-value" data-id="plus">
                            <img src="/STARTER-FILES/images/chevron.svg" alt="" class="plus" data-id="plus">
                        </button>
                    </div>
                    <h2 class="updated-price">${price}</h2>
                </div>
            </div>`
}