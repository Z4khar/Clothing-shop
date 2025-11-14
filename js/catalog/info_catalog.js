import {products} from "./products.js";
import {items} from "./items.js";


// читаем id из URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

let selectedSize = null;
let selectedColor = null;
let cartArr = JSON.parse(localStorage.getItem('cart')) || []; //  массив для корзины



renderProductsById(id);

function renderProductsById(id) {
    const product = products.find(p => p.id == id);
    console.log(product);
    if (!product) return console.error('Product not found');


    const container = document.getElementById('product-container');

    const image = container.querySelector('.img_container');
    const filters_p = container.querySelector('.name-price');
    const filters_desc = container.querySelector('.product-info');
    const details_list = container.querySelector('.ul');
    const sizeContainer = container.querySelector('.size-container');

    const texnical = container.querySelector('.texnical_button');

    // контенер для кнопки с надписью 1
    const btn_container1 = document.createElement("div");
    btn_container1.classList.add('btn-wrapper1');

    const label1 = document.createElement("p");
    label1.textContent = 'Add to favorites';
    const btn1 = document.createElement("button");
    btn1.classList.add('btn1');



    // контенер для кнопки с надписью 2
    const btn_container2 = document.createElement("div");
    btn_container2.classList.add('btn-wrapper2');

    const label2 = document.createElement("p");
    label2.textContent = 'Add card';
    const btn2 = document.createElement("button");
    btn2.classList.add('btn2');

    btn2.addEventListener('click', () => {
        if (!selectedSize || !selectedColor) {
            alert('Please select size and color!');
            return;
        }

        // Проверяем, есть ли такой товар с выбранными параметрами
        const existing = cartArr.find(item =>
            item.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
        );

        if (existing) {
            existing.quantity += 1;
        } else {

            cartArr.push({
                ...product,
                quantity: 1,
                selectedSize: selectedSize,
                selectedColor: selectedColor
            });
        }

        // сохраняем корзину
        localStorage.setItem('cart', JSON.stringify(cartArr));

        console.log(cartArr);
    });





    // для изображения
    const img_f = document.createElement("img");
    img_f.classList.add("img_f");
    img_f.src = product.detail_photo[0]; // фронт

    const img_b = document.createElement("img");
    img_b.classList.add("img_b");
    img_b.src = product.detail_photo[1]; // бэк

    // название - цена
    const name = document.createElement("h3");
    name.textContent = product.name;

    // цена
    const price = document.createElement("p");
    price.textContent =  product.price;

    //Размеры кнопка
    product.sizes.forEach(size => {
        const btn = document.createElement("button");
        btn.textContent =  size;
        btn.classList.add('size-btn');
        btn.addEventListener("click", () => {
            document.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
            btn.classList.add("active");
            selectedSize = size;
            console.log(size);

        })
        // функция на размер $
        sizeContainer.appendChild(btn);
    })

    // цвета
    const colorContainer = container.querySelector('.color-container');

    product.colors.forEach(color => {
        const colorBtn = document.createElement("button");
        colorBtn.classList.add("color-btn")
        colorBtn.style.backgroundColor = color;

        colorBtn.addEventListener("click", () => {

            document.querySelectorAll(".color-btn").forEach(button => button.classList.remove("active"));

            colorBtn.classList.add("active");
            console.log("Selected color:", color);
            selectedColor = color;
        });

        colorContainer.appendChild(colorBtn);
    })




    //Информация
    const description = document.createElement("p");
    description.textContent = product.description;

    // Детали
    for (let i = 0; i < product.details.length; i++) {
        const detail = document.createElement("li");
        detail.textContent = product.details[i];
        details_list.appendChild(detail);
    }



    image.appendChild(img_f);
    image.appendChild(img_b);

    filters_p.appendChild(name);
    filters_p.appendChild(price);

    filters_desc.appendChild(description);

    btn_container1.appendChild(label1);
    btn_container1.appendChild(btn1);
    texnical.appendChild(btn_container1);

    btn_container2.appendChild(label2);
    btn_container2.appendChild(btn2);
    texnical.appendChild(btn_container2);

}



const cardWidth = 150; // ширина карточки
const gap = 50; // gap между карточками
const numCards = items.length; // количество карточек в исходном массиве
const singleSetWidth = numCards * cardWidth + (numCards - 1) * gap;

let itemsNew = [...items];
let trackWidthEstimate = singleSetWidth;

while (trackWidthEstimate < window.innerWidth * 2) {
    itemsNew = [...itemsNew, ...items]; // дублируем массив
    trackWidthEstimate += singleSetWidth;
}


function renderCarousel(items) {


    // карточка контейнера
    const container = document.getElementById('carousel-track')


    items.forEach(item => {

        const carousel_item = document.createElement("div");
        carousel_item.classList.add('carousel_container');
        
        const image = document.createElement("img");
        image.classList.add("img_carousel");
        image.src = item.image;

        const name = document.createElement("h3");
        name.classList.add('name');
        name.textContent = item.name;

        const price = document.createElement("p");
        price.classList.add('price');
        price.textContent =  item.price;

        carousel_item.appendChild(image);
        carousel_item.appendChild(name);
        carousel_item.appendChild(price);
        container.appendChild(carousel_item);
    })
}

renderCarousel(itemsNew);




const track = document.getElementById('carousel-track');
const trackWidth = track.scrollWidth / 2;

const speed = 100; // пикселей в секунду
const duration = trackWidth / speed; // время анимации
track.style.setProperty('--track-width', `${trackWidth}px`);
track.style.setProperty('--duration', `${duration}s`);












