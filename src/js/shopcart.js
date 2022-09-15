const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach(addToCartButton => {

    addToCartButton.addEventListener('click', addToCartClicked);

})

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);


const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.item');

    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;


    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {

    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );

    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[
                i
            ].parentElement.querySelector(
                '.shoppingCartItemQuantity'
            );
            elementQuantity.value++;
            updateShoppingCartTotal();
            return;
        }
    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="shoppingCartItem">
    <button class="btn btn-danger buttonDelete"><i class='bx bx-trash'></i></button>
    <img src=${itemImage} alt="">
    <h4 class="shoppingCartItemTitle">${itemTitle}</h4>
    <h4 class="shoppingCartItemPrice">${itemPrice}</h4>
    <input class="shoppingCartItemQuantity" type="number" value="1">
    </div>
     `;

    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow
        .querySelector('.buttonDelete')
        .addEventListener('click', removeShoppingCartItem);

    shoppingCartRow
        .querySelector('.shoppingCartItemQuantity')
        .addEventListener('change', quantityChanged);

    updateShoppingCartTotal();
}
function updateShoppingCartTotal() {

    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('$', '')
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;

    });

    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;

}

function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}
