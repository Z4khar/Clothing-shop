let cartArr = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cartArr);

function renderBasketProducts(cartArr) {

    const items = document.getElementById("basket-container");


    for (const cart of cartArr) {
        // создаем карточку
        const cardBasket = document.createElement("div");
        cardBasket.classList.add("basket-items");

        // картинка
        const img = document.createElement("img");
        img.src = cart.image;
        img.classList.add("basket-img");

        // имя товара
        const name = document.createElement("h3");
        name.classList.add("name-cardBasket");
        name.textContent = cart.name;

        // цена
        const price = document.createElement("p");
        price.textContent =  cart.price;
        price.classList.add("price-basket");

        // количество товара
        const quantity = document.createElement("p");
        quantity.textContent = cart.quantity;
        quantity.classList.add("quantity-basket");

        // кнопка удаления
        const btn_remove = document.createElement("button");
        btn_remove.textContent = 'Delete';
        btn_remove.classList.add("btn_remove_basket_items");

        btn_remove.addEventListener("click", () => deleteCart(cart.id));


        // добавляем все внутрь

        cardBasket.appendChild(img);
        cardBasket.appendChild(name);
        cardBasket.appendChild(price);
        cardBasket.appendChild(quantity);
        cardBasket.appendChild(btn_remove);

        items.appendChild(cardBasket);

    }
}

function renderTotalPrices(cartArr) {
    let total = 0;
    for (const cart of cartArr) {
        if(cart.quantity > 0){
            total += cart.price * cart.quantity;
        }

        console.log(total);
    }
    const prices_div = document.getElementById("price-container")
    const total_price = document.createElement("p");
    total_price.classList.add("total-price");
    total_price.textContent = String(total);
    prices_div.appendChild(total_price);



}
function deleteCart(cartId) {
    document.getElementById("basket-container").innerHTML = "";
    document.querySelector(".total-price").innerHTML = "";

    cartArr = cartArr.filter(item => item.id !== cartId);
    localStorage.setItem("cart", JSON.stringify(cartArr));

    renderBasketProducts(cartArr)
    renderTotalPrices(cartArr)
}


renderBasketProducts(cartArr)
renderTotalPrices(cartArr)



function activePayment() {
    const deliveryGroup = document.querySelectorAll(".delivery-group")
    const paymentGroup = document.querySelectorAll(".payment-group");

    deliveryGroup.forEach(delivery => {
        delivery.addEventListener("click", () => {
            deliveryGroup.forEach((item) => {
                item.classList.remove("active");
            })
            delivery.classList.add("active");
        })
    })
    paymentGroup.forEach(payment => {
        payment.addEventListener("click", () => {
            paymentGroup.forEach((item) => {
                item.classList.remove("active");
            })
            payment.classList.add("active");
        })
    })

}
activePayment()



