import {products} from "./products.js";
import {renderProducts} from "./catalog.js";


const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

const ALL_PRODUCTS = ["T-shirts", "Hoddies", "Shorts", "Headwear", "Compression"]

const ALL_CATEGORIES = ["LifeStyle", "Training"]

function renderFilters(products) {
        //const container = document.getElementById("filters");

        const sizes_container = document.querySelector(".sizes-container");
        const products_container = document.querySelector(".products-container");
        const category_container = document.querySelector(".category-container");

        const sizesFromFilters = new Set();
        products.forEach(product => product.sizes.forEach(size => sizesFromFilters.add(size)));

        const productFromFilter = new Set();
        products.forEach(product => product.types.forEach(type => productFromFilter.add(type)));

        const categoriesFromFilters = new Set();
        products.forEach(product => product.categories.forEach(category => categoriesFromFilters.add(category)));



        // размеры
        ALL_SIZES.forEach(size => {
            const btn = document.createElement("button");
            btn.classList.add("sizes-btn");
            btn.textContent = size;

            if (sizesFromFilters.has(size)) {
                btn.addEventListener("click", () => filter_sizes(size, btn));
            } else {
                btn.disabled = true;
                btn.classList.add("disabled-btn-size");
            }
            sizes_container.appendChild(btn);
        })


        // продукты - фильтры
        ALL_PRODUCTS.forEach(type => {
            const prod_cont = document.createElement("div");
            prod_cont.classList.add('prod_cont');

            const label_product = document.createElement("p");
            label_product.classList.add('label_product');
            label_product.textContent = type;

            const btn = document.createElement("button");
            btn.classList.add('btn_product');

            if (productFromFilter.has(type)) {
                btn.addEventListener("click", () => filter_products(type, btn));

            } else {
                btn.disabled = true;
                btn.classList.add("disabled-btn-product");
            }

            prod_cont.appendChild(btn);
            prod_cont.appendChild(label_product);
            products_container.appendChild(prod_cont);
        })


            // категории
        ALL_CATEGORIES.forEach(category => {
            const cat_cont = document.createElement("div");
            cat_cont.classList.add('category-cont');

            const label_category = document.createElement("p");
            label_category.textContent = category;
            label_category.classList.add('label_category');

            const btn = document.createElement("button");
            btn.classList.add('btn_category');

            if (categoriesFromFilters.has(category)) {
                btn.addEventListener('click', () => filter_category(category, btn));
            } else {
                btn.disabled = true;
                btn.classList.add("disabled-btn-product");
            }

            cat_cont.appendChild(btn);
            cat_cont.appendChild(label_category);

            category_container.appendChild(cat_cont);

        })

}
/*    --> ФИЛЬТРАЦИЯ <--     */

// State - активные фильтры
const activeFilters = {
    sizes: new Set(), // [L, XL]   ["XS", "S", "M", "L", "XL", "XXL"], [ "XL"]
    types: new Set(),
    categories: new Set(),
    prices: null

}

// обработчики

// 1 - Размеры
function filter_sizes(size, btn) {
    btn.classList.toggle('active');

    if (activeFilters.sizes.has(size)) {
        activeFilters.sizes.delete(size);
    } else {
        activeFilters.sizes.add(size);
    }

    applyFilters();
}

// 2 - Продукты
function filter_products(type, btn) {
    btn.classList.toggle('active');

    if (activeFilters.types.has(type)) {
        activeFilters.types.delete(type);
    } else {
        activeFilters.types.add(type);
    }

    applyFilters();
}

// 3 - Категории
function filter_category(category, btn) {
    btn.classList.toggle('active');

    if (activeFilters.categories.has(category)) {
        activeFilters.categories.delete(category);
    } else {
        activeFilters.categories.add(category);
    }

    applyFilters();
}

// 4 - Цена
// Получить из массива максимум и минимум
function getPriceRange(products) {
    let priceRanges = []

    priceRanges = products.map(item => item.price)
    console.log(priceRanges); // Массив всех цен
    const max = Math.max(...priceRanges)
    const min = Math.min(...priceRanges)

    return [min, max];
}
let resultPrice = getPriceRange(products);
console.log(resultPrice);


// функция устанавливает атрибуты в инпут
function  setupSlider(resultPrice) {
    let range = document.querySelector('.range');

    range.min = resultPrice[0]
    range.max = resultPrice[1]
    range.value = resultPrice[0]

}
setupSlider(resultPrice)

// отрисовка значений
function RenderSliderValue(resultPrice) {

    let range = document.querySelector('.range');
    const min_price = document.getElementById('min-price');
    min_price.textContent = resultPrice[0]
    const max_price = document.getElementById('max-price');
    max_price.textContent = resultPrice[1]

    const value = document.getElementById('value-price');
    range.addEventListener('input', ()     => {
        const sliderValue = range.value;
        value.textContent = sliderValue;

        activeFilters.prices = sliderValue;  // отправляем значение текущее в активные фильтры
        applyFilters()
    })
}
RenderSliderValue(resultPrice)


/* ----- Фильтрация: применяем активные фильтры к исходному массиву ----- */
function applyFilters() {
    let filtered = products.slice()

    if(activeFilters.sizes.size > 0) {
        filtered = filtered.filter(item =>
            item.sizes.some(size => activeFilters.sizes.has(size))
        );
    }

    if(activeFilters.types.size > 0) {
        filtered = filtered.filter(item =>
            item.types.some(type => activeFilters.types.has(type))) ;
    }

    if(activeFilters.categories.size > 0) {
        filtered = filtered.filter(item =>
            item.categories.some(category => activeFilters.categories.has(category))) ;
    }

    if(activeFilters.prices !== null) {
        filtered = filtered.filter(item => item.price <= activeFilters.prices);
    }

    console.log(filtered);
    console.log(activeFilters);

    renderProducts(filtered);

}

renderFilters(products);
renderProducts(products);