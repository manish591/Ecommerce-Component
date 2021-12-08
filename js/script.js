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
    let emptyCartMessage = document.querySelector('.empty-cart-message');
    emptyCartMessage.classList.add('hide');
    
    let element = button.parentElement;
    let title = element.querySelector('.name').innerText;
    let price = element.querySelector('.price').innerText;
    let imageSrc = element.previousElementSibling.querySelector('.recipe-img').src;
    generateHTML(title, price, imageSrc);
}

function generateHTML(name, price, image) {
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
    let content =  `<div class="image">
                      <img class="cart-recipe-img" src=${image} alt="French Fries">
                      <p class="recipe-count">1</p>
                    </div>
                    <div class="cart-description">
                        <p class="name">${name}</p>
                        <p class="price">${price}</p>
                        <div class="select-area">
                            <div class="select-quantity">
                                <button class="decrease-price update-price-value">
                                    <img src="/STARTER-FILES/images/chevron.svg" alt="" class="minus">
                                </button>
                                <p class="quantity" data-id="1" data-value=${price}>1</p>
                                <button class="increase-price update-price-value">
                                    <img src="/STARTER-FILES/images/chevron.svg" alt="" class="plus">
                                </button>
                            </div>
                            <h2 class="updated-price">${price}</h2>
                        </div>
                    </div>`;
    div.innerHTML = content;               
    yourCartContainer.appendChild(div);
    let increasePriceButton = div.querySelector('.increase-price');
    let decreasePriceButton = div.querySelector('.decrease-price');
    increasePriceButton.addEventListener('click', increaseCartPrice);
    decreasePriceButton.addEventListener('click', decreaseCartPrice);           
}

function increaseCartPrice(event) {
    let button = event.target;
    let parent = button.parentElement.parentElement;
    let price = parent.parentElement.parentElement.querySelector('.price').innerText.replace('$', '');
    let totalPriceForCart = parent.parentElement.querySelector('.updated-price');
    let quantityToChange = parent.querySelector('.quantity');
    quantityToChange.innerText = Number(quantityToChange.innerText) + 1;
    totalPriceForCart.innerText = updateTotalPrice(price, quantityToChange.innerText);
}

function decreaseCartPrice(event) {
    let button = event.target;
    let parent = button.parentElement.parentElement;
    let price = parent.parentElement.parentElement;
    console.log(price);
    let quantityToChange = parent.querySelector('.quantity');
    quantityToChange.innerText = Number(quantityToChange.innerText) - 1;
}

function updateTotalPrice(price, quantity) {
    let currentTotal =  Number(price) * Number(quantity);
    return `$${(currentTotal).toFixed(2)}`;
}