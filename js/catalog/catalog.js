import { products } from './products.js';

 export function renderProducts(products) {

     const container = document.getElementById("catalog-container");
     container.innerHTML = "";

    for (const product of products) {
        // создаем карточку
        const card = document.createElement("div");
        card.classList.add("product-card");
        // картинка
        const img = document.createElement("img");
        img.src = product.image;

        // имя товара
        const name = document.createElement("h3");
        name.classList.add("name-card");
        name.textContent = product.name;

        // цена
        const price = document.createElement("p");
        price.textContent =  product.price;
        price.classList.add("price");


        // кнопка подробнее
        const img_btn = document.createElement("img");
        img_btn.src = './media/images/texnical/img_btn.png';
        img_btn.classList.add("info-btn");

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("img-wrapper");
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(img_btn);


        img_btn.addEventListener("click", () => {
            window.location.href = `product.html?id=${product.id}`;
            //console.log(`product.html?id=${product.id}`);
        });


        // добавляем все внутрь

        card.appendChild(imgWrapper);
        card.appendChild(name);
        card.appendChild(price);

        container.appendChild(card);

    }
}







