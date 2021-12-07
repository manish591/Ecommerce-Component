if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}


function ready() {
    const addToCartButton = document.querySelectorAll('.add-to-cart');

    addToCartButton.forEach(button => {
        button.addEventListener('click', addItmesToCart);
    });
}



function addItmesToCart(e) {
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const yourCartItemsSection = document.querySelector('.your-cart-items-section');
    e.target.style.backgroundColor = 'black';
    emptyCartMessage.classList.add('hide');
    e.target.innerHTML = `<div class="in-cart-description"><img src="/STARTER-FILES/images/check.svg"> <p>In Cart</p></div>`;
    let element = e.target.parentNode;
    let div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = generateHTML(element.dataset.name, element.dataset.price, element.dataset.image);
    yourCartItemsSection.appendChild(div);

    const increasePriceButton = document.querySelector('.increase-price');
    increasePriceButton.addEventListener('click', () => {
        let quantity = document.querySelector('.quantity');
        quantity.innerText = 5;
    })
}

function generateHTML(name, price, image) {
    return `<div class="image">
              <img class="cart-recipe-img" src="/STARTER-FILES/images/${image}.png" alt="French Fries">
              <p class="recipe-count">1</p>
            </div>
            <div class="cart-description">
                <p class="name">${name}</p>
                <p class="price">${price}</p>
                <div class="select-area">
                    <div class="select-quantity">
                        <button class="decrease-price">
                            <img src="/STARTER-FILES/images/chevron.svg" alt="" class="minus">
                        </button>
                        <p class="quantity">1</p>
                        <button class="increase-price">
                            <img src="/STARTER-FILES/images/chevron.svg" alt="" class="plus">
                        </button>
                    </div>
                    <h2 class="updated-price">${price}</h2>
                </div>
            </div>`
}